export type WeddingEvent = { id: 'haldi'|'wedding'|'reception'; name: string; date: string; dateDisplay?: string; start: string; end: string; venue: string; mapUrl: string; description: string };
export const wedding = {
  bride: 'Sudipta', groom: 'Nitesh',
  brideMother: 'Anindita Sengupta', brideFather: 'Sudip Sengupta', groomMother: 'Sumita Mehera', groomFather: 'Apurbendu Mehera',
  timezone: 'Asia/Kolkata',
  photos: { hero: '', story1: '', story2: '', story3: '' },
  quotes: { welcome: 'In all the little moments, we found our forever.', story: 'A thousand ordinary days, made extraordinary together.', closing: 'The best part of our story is sharing it with you.' },
  story: [ { title: 'A beginning', text: 'Somewhere between laughter and conversation, a new story began.' }, { title: 'The little things', text: 'In the everyday moments, we found a kind of joy that felt like home.' }, { title: 'A new chapter', text: 'And now, we cannot wait to celebrate the next chapter with you.' } ],
  events: [
    { id:'haldi', name:'Haldi', date:'2027-02-14', start:'', end:'', venue:'', mapUrl:'', description:'A little sunshine, laughter and love.' },
    { id:'wedding', name:'Wedding', date:'2027-02-14', start:'', end:'', venue:'JMS VILLA', mapUrl:'https://maps.app.goo.gl/7BycH3Q7AAzmRYbZ6', description:'The moment we say forever.' },
    { id:'reception', name:'Reception', date:'2027-02-17', start:'', end:'', venue:'Urban Fiesta Club', mapUrl:'', description:'An evening of togetherness and celebration.' },
  ] as WeddingEvent[],
  quiz: ['Who is more likely to be late?', 'Who is the better cook?', 'Who takes more selfies?', 'Who is more romantic?', 'Who plans the holidays?'].map(question => ({ question, answer: null as 'bride'|'groom'|null })),
  rsvp: { endpoint: process.env.NEXT_PUBLIC_RSVP_ENDPOINT || '', maxGuests: 10 },
} as const;
