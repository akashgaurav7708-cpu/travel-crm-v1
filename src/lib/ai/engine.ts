export const aiService = {
  async generateItinerary(prompt: any) {
    console.log('SaaS AI Prompt:', prompt);
    await new Promise(r => setTimeout(r, 2000));
    return {
      title: `${prompt.destination} Premium Experience`,
      description: `A custom-tailored journey through ${prompt.destination} optimized for a ${prompt.budget} budget.`,
      days: [
        { day_number: 1, title: 'Arrival & Grand Welcome', activities: [{ time: '10:00', title: 'Airport Transfer', type: 'Transport', location: 'Main Terminal', desc: 'Luxury private vehicle pickup.' }] },
        { day_number: 2, title: 'Historical Immersion', activities: [{ time: '09:00', title: 'Guided City Tour', type: 'Sightseeing', location: 'Old District', desc: 'Deep dive into local heritage.' }] }
      ],
      cost_breakdown: {
         hotels: prompt.budget * 0.4,
         transport: prompt.budget * 0.2,
         activities: prompt.budget * 0.1,
         markup: prompt.budget * 0.15
      }
    };
  },
  async calculateCost(items: any[]) {
    const base = items.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
    return {
       base,
       gst: base * 0.05,
       markup: base * 0.15,
       total: base * 1.20
    };
  }
};
