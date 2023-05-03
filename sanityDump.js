/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */

import { readdir, readFile } from 'fs/promises';
import { createClient } from 'next-sanity';

const SanityClient = createClient({
  projectId: 'p6yd2y5a',
  dataset: 'production',
  apiVersion: 'v2021-10-21',
  useCdn: true,
  token: 'skNLbJWufDFJHidJZ9NgSvEqy889JLGGXZU5pKXiZy9lNKWAnzOwTqJiJZf4wi19xaima8QmZ1tglGiy',
});

const titles = [
  '7 Free Apps That Make Vacation Planning a Breeze',
  '7 Practices That Make You Look Like a Rookie Blogger',
  '10 Things You Can Learn From the Apple Store',
  'Do You Do Any of These Ten Embarrassing Things?',
  'Tricky English Grammar Mistakes to Avoid',
  'Secret Strategy to Stop a Cold Quickly',
  'Everyday Tools to Help You Lose Weight',
  'How I Made a Fortune With a "Fool Idea"',
  'Millionaire Day Trader Reveals How to Cash In',
  'What Kind of Body Do You Want?',
  'Can Twitter Predict the Future? Pentagon Says Maybe',
  'Do Media Vultures Perpetuate Mass Shootings?',
  'Do Some Foods "Explode" in Your Stomach?',
  'Is the Life of a Child Worth $1 to You?',
  'Suicide of a Hacker',
  'Suppose This Happened on Your Wedding Day!',
  'The Child Who Won the Hearts of All',
  'This Tiny Mistake Costs Gardeners $3,000 a Year',
  'When Doctors Feel "Rotten" This is What They Do',
  "You'll Never Get Hired if You Say This in a Job Interview",
  'Is Zoom Fatigue a Real Thing?',
  'Can a Website Help You Beat Jet Lag?',
  'Fushigi Ball Poised to be Bigger than Snuggies, Xbox',
  'How Much is "Worker Tension" Costing Your Company?',
  'Streaming Video Could Kill Shared Data Plans',
  'Will Families Social Distance for the Holidays?',
  'How a New Discovery Made a Plain Girl Beautiful',
  'How a New Kind of Clay Improved My Complexion in 30 Minutes',
  'Top U.S. Cities for Bedbug Infestations',
  'Is Takeout the Latest Fine Dining Trend?',
  'Delight in the Desert Southwest',
  'Don\'t Let Athlete\'s Foot "Lay You Up"',
  'Draw Readers in With Our Creative Book Cover Designs',
  'For the Woman Who is Older Than She Looks',
  'Guaranteed to Go Through Ice, Mud, or Snow - Or We Pay the Tow!',
  'Hands That Look Lovelier in 24 Hours, Or Your Money Back',
  'Pierced by 302 Nails...Retains Full Air Pressure',
  'No Publisher, No Problem! Discover Self-Publishing Success',
  'Proven System: Master a New in Language in 10 Days',
  'Improve Your Memory in Just 5 Minutes Per Day',
  'Nature Lover and Environmental Activist',
  'Drama Nerd Who Loves Being in the Spotlight',
  'Recovering Accountant in Retirement',
  'Recently Relocated Outdoors Enthusiast',
  'Adventurous Free Spirit: Travel, Arts and Wine Enthusiast',
  'Creative Crafter and Culinary Concocter',
  'Enthusiastic, Energetic and Excited to Meet New People',
  'Self-Proclaimed Gaming Geek',
  'Humble Homesteader Navigating Self-Reliance',
  'Content and Happy in the Universe',
  'Content and Happy in the Universe',
  'Find Your X',
  'X in [Your Target Location]',
  'Visit Our Store Now',
  'Get Your Quote Today',
  '[Your Brand] vs [Your Competitor]',
  'Voted Best X of 2022',
  'Trusted by X Experts',
  '24-Hour Emergency Service',
  'Ridiculously Good X',
  'The Easiest X',
  'X% Off Your Purchase',
  'Free Shipping',
  'Try 30 Days Risk-Free',
  'See How Much You Could Save',
  'Great Teams Use X',
  'See Why X Companies Use Our Brand',
  'Want Next-Level X?',
  'The Ultimate X Replacement',
  'Start Your Free Trial Today',
  'Give the Gift of X This [Holiday]',
  'Do X With Confidence',
  'Reimagine Your X',
  'X Made Affordable',
  'Order Now to Get X',
  'Quick description of your product',
  'Request Your Demo Today',
  'Introducing X: Learn More',
  'Download Your Free Guide to X',
  'Startin X-ing Now',
  'The Most Successful X in the World',
  'The X You Need to Get the Y You Want',
  'The X Rules Every [Industry] Leader Needs',
  'Feeling Stuck? Start Here',
  'Grow Your Business With X',
  '[Your Business]: The Next-Generation X',
  'What Is X Worth to You?',
];

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

function myAsyncSlugifier(input, type) {
  const slug = slugify(input);
  const query = 'count(*[_type=="novedad" && slug.current match $slug]{_id})';
  const params = { slug };
  return SanityClient.fetch(query, params).then((count) => {
    if (count > 0) {
      return `${slug}-${count + 1}`;
    }
    return slug;
  });
}

const bulkCreateNovedades = async (quantity) => {
  for (let index = 0; index < quantity; index++) {
    let file;
    try {
      const folder = await readdir('D:\\Pack de Wallpapers\\Wallpapers 4K');
      const path = `D:\\Pack de Wallpapers\\Wallpapers 4K\\${folder[index]}`;
      file = await readFile(path);
    } catch (err) {
      throw new Error(`couldn't read folder or file ${err}`);
    }
    let uploadedImg;
    try {
      uploadedImg = await SanityClient.assets.upload('image', file);
    } catch (err) {
      throw new Error(`error uploading img`);
    }

    const doc = {
      _type: 'novedad',
      titulo: titles[index],
      contenido: [],
      imagen: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImg._id,
        },
      },
      slug: { _type: 'slug', current: slugify(titles[index]) },
      fechaPublicacion: new Date().toISOString(),
    };

    await SanityClient.create(doc);
  }
  console.log('finished successfully');
};

const deleteAllNovedades = async () => {
  await SanityClient.delete({ query: `*[_type == "novedad"]` });
  console.log('deleted everything');
};

deleteAllNovedades();
bulkCreateNovedades(100);
