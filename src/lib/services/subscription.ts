import { createClient } from '../supabase';

const supabase = createClient();

export const subscriptionService = {
  async getMyPlan() {
    const { data: profile } = await supabase
      .from('profiles')
      .select('company_id, companies(plan_id, saas_plans(*))')
      .single();

    return profile?.companies?.saas_plans;
  },

  async checkLimit(module: 'users' | 'leads' | 'bookings') {
    const plan = await this.getMyPlan();
    if (!plan) return true; // Default allow in dev

    const { count } = await supabase
      .from(module === 'users' ? 'profiles' : module)
      .select('*', { count: 'exact', head: true });

    const limitMap: any = {
      users: plan.max_users,
      leads: plan.max_leads,
      bookings: plan.max_bookings
    };

    return (count || 0) < limitMap[module];
  }
};
