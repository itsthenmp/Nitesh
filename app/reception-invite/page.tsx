import type { Metadata } from 'next';
import Invitation from '@/components/Invitation';

const url = 'https://itsthenmp.github.io/Nitesh/reception-invite/';
const image = 'https://itsthenmp.github.io/Nitesh/photos/reception-share-v2.jpg';

export const metadata: Metadata = {
  title: 'Nitesh & Sudipta | Reception Invite',
  description: 'Join Nitesh and Sudipta for their reception on 17 February 2027.',
  openGraph: {
    type: 'website',
    url,
    title: 'Nitesh & Sudipta | Reception Invite',
    description: 'Join Nitesh and Sudipta for their reception on 17 February 2027.',
    images: [{ url: image, width: 1200, height: 627, type: 'image/jpeg', alt: 'Reception Invite in gold on a burgundy card' }],
  },
  twitter: { card: 'summary_large_image', images: [image] },
};

export default function Page() { return <Invitation />; }
