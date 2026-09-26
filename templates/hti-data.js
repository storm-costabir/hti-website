/* ============================================================================
   hti-data.js — the single content source for the three layout templates
   ----------------------------------------------------------------------------
   The whole point of the exercise is to compare LAYOUTS, so the three
   templates must not differ by a single word or logo. Every string, image
   path and link on all three pages is read from this file. Change a stat here
   and it changes on all three at once; if a template hard-codes content, the
   comparison stops being fair.

   Paths are written relative to /templates/, so they start with "../".
   When a template is promoted to the real homepage, the only mechanical
   change needed is dropping that "../" prefix.
   ========================================================================== */

window.HTI = (function () {

  /* ---- the line under the logo -------------------------------------- */
  const brand = {
    name: 'HTI India',
    legal: 'Hospitality Training Institute India Private Limited',
    since: 2002,
    phone: '+91 77380 60902',
    phoneHref: 'tel:+917738060902',
    whatsapp: 'https://wa.me/917738060902',
    email: 'kaushal@hti-india.com',
    logo: '../images/brand/hti-logo-nav.webp',
    address: 'A433 Vashi Plaza, Sector 17, Sion Panvel Highway, Vashi, Navi Mumbai 400703',
    social: [
      ['Facebook', 'https://www.facebook.com/hti.india/'],
      ['Instagram', 'https://www.instagram.com/hti.india/'],
      ['LinkedIn', 'https://www.linkedin.com/company/hospitality-training-institute-india-pvt-ltd'],
      ['YouTube', 'https://www.youtube.com/c/Hti-india']
    ]
  };

  /* ---- hero ----------------------------------------------------------
     The rotating tail of the H1 is kept because it is the one piece of
     motion on the page that says what the training is FOR. The static
     first half carries the keyword, so the H1 still reads correctly to a
     crawler with JS off. */
  const hero = {
    lead: 'Train your staff in ways to',
    rotate: [
      'increase customer retention.',
      'handle guest complaints.',
      'serve with style.'
    ],
    sub: 'Hospitality businesses use HTI to train, monitor progress and certify their front-end personnel.',
    note: 'And oh — we have conducted trainings in 13 different languages.',
    ctaPrimary: { label: 'Speak with our team', href: '../contact.html' },
    ctaSecondary: { label: 'Take the free survey', href: '../training-needs-survey.html' }
  };

  /* ---- the numbers ---------------------------------------------------- */
  const stats = [
    ['300K+', 'Students trained'],
    ['60+', 'Brands'],
    ['5', 'Countries'],
    ['410+', 'Cities'],
    ['13+', 'Languages'],
    ['15+', 'Programs'],
    ['350+', 'Local language trainers'],
    ['400K+', 'Live training hours']
  ];

  /* ---- why HTI -------------------------------------------------------- */
  const why = [
    {
      icon: '../images/icons/interact.svg',
      title: 'Learn by doing',
      text: 'Training is generally boring, but not with HTI. Our sessions are built on activities that simulate the situations your team actually faces on the floor.'
    },
    {
      icon: '../images/icons/the-community.svg',
      title: 'In person, at your property',
      text: 'Live, in-person, brand-specific sessions that take your team deep into the fundamentals of service — run where they work, not in a classroom.'
    },
    {
      icon: '../images/icons/learn-by-doing.svg',
      title: 'We make training tangible',
      text: 'The Training Tsunami app tracks and monitors every participant, so training stops being a line item and starts being a number you can read.'
    }
  ];

  /* ---- programmes ----------------------------------------------------
     This is the block the current homepage does not have. Fifteen
     programme pages are reachable only through a hover dropdown, which
     means the strongest page on the site passes them almost no internal
     links and a phone visitor has to guess. Listing them here gives every
     programme page a crawlable link from the homepage and gives the
     visitor a way to self-select. */
  const venues = [
    { key: 'restaurants', label: 'Restaurants & QSRs', href: '../restaurants.html' },
    { key: 'hotels', label: 'Hotels & Resorts', href: '../hotels.html' },
    { key: 'offices', label: 'Offices & Retail', href: '../offices.html' }
  ];

  const programmes = [
    // --- restaurants -------------------------------------------------
    { code: 'SUPER', venue: 'restaurants', group: 'Service team', href: '../super.html',
      who: 'Waiters, stewards, captains, hostesses',
      line: 'A 12-week skill upgradation program covering soft skills, job skills and guest service.' },
    { code: 'SUPPORT', venue: 'restaurants', group: 'Service team', href: '../support.html',
      who: 'The same roles, before you open',
      line: 'Prepares a pre-opening restaurant team on skills, culture alignment and team bonding.' },
    { code: 'ICEDT', venue: 'restaurants', group: 'Service team', href: '../icedt.html',
      who: 'Counter executives, sales boys, servers',
      line: 'Certified counter and sales-floor training built for QSRs and quick-turn restaurants.' },
    { code: 'iCARE', venue: 'restaurants', group: 'Guest experience', href: '../icare.html',
      who: 'Customer service execs, supervisors',
      line: 'The art of guest service — empathy, recovery and hospitality excellence.' },
    { code: 'Vow to Wow', venue: 'restaurants', group: 'Guest experience', href: '../vow.html',
      who: 'Frontline reps, team leaders',
      line: 'How to exceed a guest expectation on purpose, and turn it into a returning customer.' },
    { code: 'RAMP', venue: 'restaurants', group: 'Managers', href: '../ramp.html',
      who: 'Restaurant managers & supervisors',
      line: 'Operations, team management and the business side of running a restaurant.' },

    // --- hotels -------------------------------------------------------
    { code: 'FORT', venue: 'hotels', group: 'Rooms & front desk', href: '../fort.html',
      who: 'Receptionists, FO executives, GREs, bell boys',
      line: 'Check-in, guest handling and front desk operations, front to back.' },
    { code: 'HOT-CAR', venue: 'hotels', group: 'Rooms & front desk', href: '../hotcar.html',
      who: 'Housekeeping attendants & supervisors',
      line: 'Room standards, cleanliness discipline and the housekeeping side of guest satisfaction.' },
    { code: 'KMT', venue: 'hotels', group: 'Kitchen', href: '../kmt.html',
      who: 'Chefs, sous chefs, kitchen supervisors',
      line: 'Food safety, kitchen operations and culinary management.' },
    { code: 'Hotel SHOT', venue: 'hotels', group: 'Whole property', href: '../hotel-shot.html',
      who: 'Every hotel role — F&B to security',
      line: 'A whole-property upgrade of guest service, operations and hospitality standards.' },
    { code: 'CUP', venue: 'hotels', group: 'Villas & homestays', href: '../cup.html',
      who: 'Caretakers of villas, homestays, guesthouses',
      line: 'Serve like a hotel without losing the homely touch a villa is booked for.' },
    { code: 'CLASS', venue: 'hotels', group: 'Grooming & management', href: '../class.html',
      who: 'Guest-facing & corporate professionals',
      line: 'Grooming, etiquette, communication and professional presentation.' },
    { code: 'MDP', venue: 'hotels', group: 'Grooming & management', href: '../mdp.html',
      who: 'Newly promoted & mid-level managers',
      line: 'Management skills, decision-making and team leadership for hospitality leaders.' },

    // --- offices ------------------------------------------------------
    { code: 'POST', venue: 'offices', group: 'Pantry & cafeteria', href: '../post.html',
      who: 'Corporate pantry staff & attendants',
      line: 'Food service, hygiene and pantry operations for a corporate floor.' },
    { code: 'TOP', venue: 'offices', group: 'Support staff', href: '../top.html',
      who: 'Peons, office boys, support staff',
      line: 'Grooming, service and professional workplace skills for office support teams.' }
  ];

  /* ---- everything that is not a core venue programme ------------------ */
  const more = [
    { label: 'Lead by HTI', href: '../lead.html', line: 'Train the trainer, presentation and soft skills' },
    { label: 'Leadership Development', href: '../leadership-development.html', line: 'Senior managers and future leaders' },
    { label: 'Professional Etiquette', href: '../professional-etiquette.html', line: 'Corporate and client-facing professionals' },
    { label: 'POSH Training', href: '../posh-training.html', line: 'All employees, managers and ICC members' },
    { label: 'FSSAI Training', href: '../fssai-training.html', line: 'Food handlers and food safety supervisors' },
    { label: 'Develop SOPs & How-To Videos', href: '../dox.html', line: 'Owners and operations heads' },
    { label: 'Team Building', href: 'https://wooshbiz.com/', line: 'Group activities for any team', external: true }
  ];

  const tools = [
    { label: 'Food Cost Calculator', href: '../food-cost-calculator.html', line: 'Work out your food cost percentage, free' },
    { label: 'Restaurant Cost Calculator', href: '../restaurant-cost-calculator.html', line: 'Prime cost, profit and break-even, free' },
    { label: 'Training Needs Survey', href: '../training-needs-survey.html', line: '15 questions, 3 minutes, a plan in return' }
  ];

  /* ---- the Training Tsunami app -------------------------------------- */
  const app = {
    title: 'Track participant progress',
    intro: 'We built an application that lets you track and monitor your staff through a programme, so training stops being a thing you hope worked.',
    shot: '../images/app/star-mobile-view.png',
    steps: [
      { title: 'Identify your star performers',
        text: 'Hard work beats talent, and only the talented ones make a good first impression. The app finds the people who are hungry to learn.' },
      { title: 'Participation reports',
        text: 'Training used to be intangible. Reports make it tangible — attendance, engagement and progress per person.' },
      { title: 'In-app audits and tests',
        text: 'Every session ends with reinforcement, which tells the trainer how much actually landed.' }
    ]
  };

  /* ---- trainers ------------------------------------------------------
     `bio` is a one-line summary taken from each trainer's own profile page,
     so a layout that opens a card in place has something real to show. A
     disclosure that reveals nothing but a restatement of the job title is
     worse than no disclosure, so nothing here is invented to fill it. */
  const trainers = [
    { name: 'Dominic CostaBir', role: 'Director, HTI India Pvt Ltd',
      img: '../images/trainers/dominic-costabir.jpg', href: '../dominic-costabir.html',
      bio: 'Founded HTI in 2002. Runs team building, leadership and dining etiquette sessions, and is the trainer most of these reviews are about.' },
    { name: 'Kaushal Dutta', role: 'CEO, HTI India Pvt Ltd',
      img: '../images/trainers/kaushal-dutta.jpg', href: '../kaushal-dutta.html',
      bio: '14 years in hospitality and an MTech in Hospitality & Tourism. Runs leadership and hotel operations programmes for Ginger Hotels, Air India and more.' },
    { name: 'Rajan Kale', role: 'COO Restaurants, HTI India Pvt Ltd',
      img: '../images/trainers/rajan-kale.jpg', href: '../rajan-kale.html',
      bio: '22 years in Food & Beverage service — dishwasher to Director of Operations to senior soft skills trainer. Runs the restaurant floor programmes.' },
    { name: 'Ketaki Ponde', role: 'COO of STAR by HTI',
      img: '../images/trainers/ketaki-ponde.jpg', href: '../ketaki-ponde.html',
      bio: '25 years in hospitality and a former hotel management faculty member. Helps professionals present with confidence.' },
    { name: 'Bhaskar Sen', role: 'Strategic Partner & Senior Trainer',
      img: '../images/trainers/bhaskar-sen.jpg', href: '../bhaskar-sen.html',
      bio: 'IHM Pusa alumnus with 35+ years in HR and L&D. Has mentored over 20,000 professionals.' },
    { name: 'Atul Mishra', role: 'T3 App Developer & Associate Trainer',
      img: '../images/trainers/atul-mishra.jpg', href: '../atul-mishra.html',
      bio: 'Rebuilt the T3 training app and helps design the Tech nXt course. The reports you read come out of his work.' },
    { name: 'Pushpa Chatterjee', role: 'Senior Trainer, HTI India Pvt Ltd',
      img: '../images/trainers/pushpa-chatterjee.jpg', href: '../pushpa-chatterjee.html',
      bio: 'IHM Mumbai alumna with 30+ years in hospitality and education. Trains business communication and etiquette.' }
  ];

  /* ---- testimonials --------------------------------------------------
     `short` is a pulled sentence for layouts that show a wall of quotes;
     `text` is the full review, identical to the Review schema on the live
     homepage. No template may paraphrase either. */
  const testimonials = [
    {
      name: 'Karyna Bajaj', role: 'Executive Director', org: 'KA Hospitality Pvt Ltd',
      img: '../images/testimonials/2-karyna-bajaj.jpg',
      short: 'Since then, we have got HTI on board to train all levels within our company.',
      text: 'We got Dominic and HTI to come do a session with us for team building and leadership during our annual budget meet. The session was engaging, motivational and a great learning experience for everyone involved! Since then, we have got HTI on board to train all levels within our company, and are looking forward to working collaboratively with them to deliver a great dining experience and make our internal and external guests happy.'
    },
    {
      name: 'Rukshana Billimoria', role: 'Principal', org: "Anjuman-I-Islam's Institute Of Hotel Management",
      img: '../images/testimonials/1-rukshana.jpg',
      short: 'One of the best trainers that we have ever come across. His style is not just unique, but effective.',
      text: 'Dominic CostaBir is one of his kind, one of the best Trainers that we have ever come across. With a mission for improving Hospitality through Training, he started HTI (Hospitality Training Institute) in 2002. He wears his heart on his sleeve and is someone who would never hesitate to call a spade a spade, leads by example, and can get the best out of even the most introverted students. His style of delivering the training program is not just unique, but effective. There were online and offline training sessions for our students that included STAR (Zoom Star Presenter), Dining Etiquette, and coordinating with government officials to conduct FOSTAC (Food Safety Training and Certification). He and his team also implemented the training program WAR – Workshop on Activating Rainmakers, along with an industrial visit that included Carnival Masti and team building exercises. We got to learn a lot from the team building exercises and the various sessions conducted. Each team member is exactly aware of their role and fulfills each task to perfection, with great coordination among each other. We wish Team HTI the very best!'
    },
    {
      name: 'Rahul Khanna', role: 'Co-Founder', org: 'Azure Hospitality Pvt Ltd',
      img: '../images/testimonials/3-rahul-khanna.jpg',
      short: 'Over 200 people over the years have benefited from a mix of analytical, playful and team activities.',
      text: 'HTI curated off-sites with Azure Hospitality have always been memorable and genuinely effective for team morale, camaraderie and bonding. We have had over 200 people over the years benefit from a mix of analytical, playful and team activities. I have always found Team HTI led by Dominic to be filled with ideas, energy, patience and selfless care for our team and company objectives. I wish them well and recommend their training to others.'
    },
    {
      name: 'Sanjeev Tripathi', role: 'Head — Field Marketing', org: 'Pidilite Industries Ltd',
      img: '../images/testimonials/4-sanjeev-tripathi.jpg',
      short: 'A professional approach with a personal touch gave them an edge over other training agencies.',
      text: 'We engaged HTI for WAR – Workshop on Activating Rainmakers and CREAM – Customer Relationship Engagement And Management. A professional approach with a personal touch gave them an edge over other training agencies retained in the past. The services they offer matched our requirement of training external (Pidilite associates) and internal teams on Soft Skill Development. Overall, engaging with HTI was a superb experience. Our team loved the program and we would give HTI a very high rating over various parameters like engagement, content, the learning experience, newness, variety, and objective achievement. We have also seen an improvement in the efficiency and attitude of our team!'
    },
    {
      name: 'Maria Chandwani', role: 'Head — HR, Training & Administration', org: 'GINGER, A TATA Enterprise',
      img: '../images/testimonials/6-maria-chandwani.jpg',
      short: 'They have partnered with GINGER to improve guest satisfaction scores.',
      text: "HTI's training is effective, boosting staff morale and skills; moreover, they have partnered with GINGER to improve guest satisfaction scores."
    },
    {
      name: 'Ashutosh Ahluwalia', role: 'Director', org: 'QED Productions Pvt Ltd',
      img: '../images/testimonials/5-ashutosh-ahluwalia.jpg',
      short: 'They have accommodated our last minute changes with aplomb.',
      text: 'The sessions are interactive, and have involved role play and skits. We have got positive responses from the participants, viz. school bus drivers, attendants and lady attendants to our program. It has indeed been a pleasure working with HTI on this program. The Team are a highly motivated, professional, cooperative and skilled group, who believe in the mantra of, "Client is King". They have accommodated our last minute changes with aplomb!'
    },
    {
      name: 'Amit Mehta', role: 'AVP', org: 'Kamat Hotels (India) Limited',
      img: '../images/testimonials/7-amit-mehta.jpg',
      short: 'HTI is completely reliable and has never failed in fulfilling our demands.',
      text: 'The training delivered by HTI has been consistent and whenever we have raised any concerns, they have promptly rectified the issues. We have found improvement and change in the staff attitude and behaviour – especially in their grooming, hygiene, customer service and morale. HTI is completely reliable and has never failed in fulfilling our demands.'
    }
  ];

  /* ---- client logos --------------------------------------------------
     [file, brand name]. The name is the alt text: a wall of logos with
     empty alts tells a crawler nothing about who HTI has trained, and
     those brand names are half the reason the section exists. */
  const clientsColour = [
    ['../images/clients/64-hilton.svg', 'Hilton Hotels & Resorts'],
    ['../images/clients/zomato-add-new-logo.avif', 'Zomato'],
    ['../images/clients/7.png', 'Ginger Hotels'],
    ['../images/clients/65-sbi.svg', 'State Bank of India'],
    ['../images/clients/4.png', 'Mainland China'],
    ['../images/clients/66-pugdundee-safaris.webp', 'Pugdundee Safaris'],
    ['../images/clients/21.png', 'Air India'],
    ['../images/clients/15.png', 'Sahara Star'],
    ['../images/clients/9.png', 'Hakkasan'],
    ['../images/clients/68-burma-burma.png', 'Burma Burma Restaurant & Tea Room'],
    ['../images/clients/3.png', 'Dhaba Estd 1986 Delhi'],
    ['../images/clients/53-birla-opus.png', 'Birla Opus'],
    ['../images/clients/27.png', 'Club Mahindra, Mahindra Holidays & Resorts'],
    ['../images/clients/29.png', 'Pidilite Industries'],
    ['../images/clients/67-singinawa.webp', 'Singinawa Jungle Lodge, Kanha'],
    ['../images/clients/13.png', 'OYO'],
    ['../images/clients/8.png', 'Copper Chimney'],
    ['../images/clients/17.png', 'Tata Motors'],
    ['../images/clients/10.png', 'VITS Select Hotels'],
    ['../images/clients/bbt-update-logo.avif', 'Bhagat Tarachand'],
    ['../images/clients/46.png', 'OBLU by Atmosphere at Helengeli, Maldives'],
    ['../images/clients/22.png', 'Asia Kitchen'],
    ['../images/clients/26.png', 'Imagicaa'],
    ['../images/clients/wet-n-joy-add-new-logo.avif', 'Wet n Joy'],
    ['../images/clients/25.png', 'Yauatcha'],
    ['../images/clients/31.png', 'Hindustan Petroleum'],
    ['../images/clients/35.png', 'Goa Portuguesa'],
    ['../images/clients/43.png', 'Miraj Cinemas']
  ];

  /* white-on-dark cuts, for sections that run on the black band */
  const clientsWhite = [
    ['../images/clients/1.webp', 'Bhagat Tarachand'],
    ['../images/clients/2.webp', 'Mamagoto'],
    ['../images/clients/3.webp', 'The Yellow Chilli'],
    ['../images/clients/4.webp', 'Prasad Food Divine'],
    ['../images/clients/5.webp', 'Copper Chimney'],
    ['../images/clients/6.webp', 'VITS Select Hotels'],
    ['../images/clients/7.webp', 'Mainland China'],
    ['../images/clients/8.webp', 'CinCin'],
    ['../images/clients/10.webp', 'Ginger Hotels'],
    ['../images/clients/11.webp', 'Hakkasan'],
    ['../images/clients/12.webp', 'Sahara Star'],
    ['../images/clients/13.webp', 'Yauatcha'],
    ['../images/clients/14.webp', 'OYO'],
    ['../images/clients/15.webp', 'Tata Motors'],
    ['../images/clients/16.webp', 'Club Mahindra, Mahindra Holidays & Resorts'],
    ['../images/clients/17.webp', 'Air India'],
    ['../images/clients/18.webp', 'Pidilite Industries'],
    ['../images/clients/19.webp', 'Foxtrot'],
    ['../images/clients/20.webp', 'Hindustan Petroleum'],
    ['../images/clients/21.webp', 'Goa Portuguesa'],
    ['../images/clients/22.webp', 'India Pavilion'],
    ['../images/clients/24.webp', 'Miraj Cinemas'],
    ['../images/clients/64-hilton-white.svg', 'Hilton Hotels & Resorts'],
    ['../images/clients/65-sbi-white.svg', 'State Bank of India'],
    ['../images/clients/66-pugdundee-safaris-white.webp', 'Pugdundee Safaris'],
    ['../images/clients/67-singinawa-white.webp', 'Singinawa Jungle Lodge, Kanha'],
    ['../images/clients/68-burma-burma-white.png', 'Burma Burma Restaurant & Tea Room'],
    ['../images/clients/46-oblu-white.webp', 'OBLU by Atmosphere at Helengeli, Maldives']
  ];

  /* ---- the hero's two scrolling logo columns -------------------------
     This is the one piece of the live homepage that stays. The order is
     the live site's: the largest names lead, and hospitality and corporate
     are mixed through both columns so neither reads as the "big brand"
     column. Each list is rendered twice for a seamless loop, and the second
     copy is hidden from assistive tech so no brand name is announced twice.

     `white` holds the reversed-out cut of the same brand, for the template
     that runs its hero on a dark ground. Index for index with `colour`. */
  const heroColumns = {
    colour: [
      [ ['../images/clients/64-hilton.svg', 'Hilton Hotels & Resorts'],
        ['../images/clients/zomato-add-new-logo.avif', 'Zomato'],
        ['../images/clients/7.png', 'Ginger Hotels'],
        ['../images/clients/65-sbi.svg', 'State Bank of India'],
        ['../images/clients/4.png', 'Mainland China'],
        ['../images/clients/66-pugdundee-safaris.webp', 'Pugdundee Safaris'],
        ['../images/clients/21.png', 'Air India'],
        ['../images/clients/15.png', 'Sahara Star'],
        ['../images/clients/9.png', 'Hakkasan'],
        ['../images/clients/68-burma-burma.png', 'Burma Burma Restaurant & Tea Room'],
        ['../images/clients/3.png', 'Dhaba Estd 1986 Delhi'] ],
      [ ['../images/clients/53-birla-opus.png', 'Birla Opus'],
        ['../images/clients/27.png', 'Club Mahindra, Mahindra Holidays & Resorts'],
        ['../images/clients/29.png', 'Pidilite Industries'],
        ['../images/clients/67-singinawa.webp', 'Singinawa Jungle Lodge, Kanha'],
        ['../images/clients/13.png', 'OYO'],
        ['../images/clients/8.png', 'Copper Chimney'],
        ['../images/clients/17.png', 'Tata Motors'],
        ['../images/clients/10.png', 'VITS Select Hotels'],
        ['../images/clients/bbt-update-logo.avif', 'Bhagat Tarachand'],
        ['../images/clients/46.png', 'OBLU by Atmosphere at Helengeli, Maldives'],
        ['../images/clients/22.png', 'Asia Kitchen'] ]
    ],
    white: [
      [ ['../images/clients/64-hilton-white.svg', 'Hilton Hotels & Resorts'],
        ['../images/clients/10.webp', 'Ginger Hotels'],
        ['../images/clients/65-sbi-white.svg', 'State Bank of India'],
        ['../images/clients/7.webp', 'Mainland China'],
        ['../images/clients/66-pugdundee-safaris-white.webp', 'Pugdundee Safaris'],
        ['../images/clients/17.webp', 'Air India'],
        ['../images/clients/12.webp', 'Sahara Star'],
        ['../images/clients/11.webp', 'Hakkasan'],
        ['../images/clients/68-burma-burma-white.png', 'Burma Burma Restaurant & Tea Room'],
        ['../images/clients/3.webp', 'The Yellow Chilli'] ],
      [ ['../images/clients/16.webp', 'Club Mahindra, Mahindra Holidays & Resorts'],
        ['../images/clients/18.webp', 'Pidilite Industries'],
        ['../images/clients/67-singinawa-white.webp', 'Singinawa Jungle Lodge, Kanha'],
        ['../images/clients/14.webp', 'OYO'],
        ['../images/clients/5.webp', 'Copper Chimney'],
        ['../images/clients/15.webp', 'Tata Motors'],
        ['../images/clients/6.webp', 'VITS Select Hotels'],
        ['../images/clients/1.webp', 'Bhagat Tarachand'],
        ['../images/clients/46-oblu-white.webp', 'OBLU by Atmosphere at Helengeli, Maldives'],
        ['../images/clients/2.webp', 'Mamagoto'] ]
    ]
  };

  const press = [
    ['../images/press/business-standard-logo.webp', 'Business Standard'],
    ['../images/press/times-of-india-newspaper-logo-hd-png-download.webp', 'The Times of India'],
    ['../images/press/daily-news-analysis-logo.webp', 'DNA'],
    ['../images/press/et-hospitality.webp', 'ET HospitalityWorld'],
    ['../images/press/the-financial-express-vector-logo.webp', 'The Financial Express'],
    ['../images/press/the-week-logo1.webp', 'The Week'],
    ['../images/press/free-press.webp', 'Free Press Journal'],
    ['../images/press/the-print.webp', 'ThePrint']
  ];

  /* ---- cities --------------------------------------------------------
     Ten landing pages that exist to be found. They earn their traffic
     from internal links, and the homepage is the strongest linker on the
     domain, so every layout keeps this strip. */
  const cities = [
    ['Mumbai', '../hospitality-training-mumbai.html'],
    ['Delhi NCR', '../hospitality-training-delhi-ncr.html'],
    ['Pune', '../hospitality-training-pune.html'],
    ['Bengaluru', '../hospitality-training-bengaluru.html'],
    ['Hyderabad', '../hospitality-training-hyderabad.html'],
    ['Chennai', '../hospitality-training-chennai.html'],
    ['Kolkata', '../hospitality-training-kolkata.html'],
    ['Goa', '../hospitality-training-goa.html'],
    ['Jaipur', '../hospitality-training-jaipur.html'],
    ['Ahmedabad', '../hospitality-training-ahmedabad.html']
  ];

  const cityIntro = 'HTI trainers travel from the Navi Mumbai head office and run sessions at your own property. Sessions have gone out to over 410 cities across India — these are the ones with a page of their own.';

  /* ---- footer --------------------------------------------------------- */
  const footer = [
    { head: 'HTI', links: [
      ['About Us', '../about.html'],
      ['Our Trainers', '../trainers.html'],
      ['Our Brands', '../brands.html'],
      ['Contact Us', '../contact.html'],
      ['Training Needs Survey', '../training-needs-survey.html']
    ]},
    { head: 'Programmes', links: [
      ['Restaurants & QSRs', '../restaurants.html'],
      ['Hotels', '../hotels.html'],
      ['Offices', '../offices.html'],
      ['Find training by role', '../training-by-role.html'],
      ['All programmes', '../hospitality-training-programs.html']
    ]},
    { head: 'More', links: [
      ['Lead by HTI', '../lead.html'],
      ['Leadership Development', '../leadership-development.html'],
      ['Professional Etiquette', '../professional-etiquette.html'],
      ['POSH Training', '../posh-training.html'],
      ['FSSAI Training', '../fssai-training.html'],
      ['SOPs & How-To Videos', '../dox.html'],
      ['Team Building', 'https://wooshbiz.com/']
    ]},
    { head: 'Free tools', links: [
      ['Food Cost Calculator', '../food-cost-calculator.html'],
      ['Restaurant Cost Calculator', '../restaurant-cost-calculator.html'],
      ['Blog', '../blog.html'],
      ['Privacy Policy', '../privacy-policy.html']
    ]}
  ];

  /* ---- inline SVG the templates reuse --------------------------------- */
  const icons = {
    linkedin: '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M26.2 4H5.8C4.8 4 4 4.8 4 5.7v20.5c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V5.7c0-.9-.8-1.7-1.8-1.7zM11.1 24.4H7.6V13h3.5v11.4zm-1.7-13c-1.1 0-2.1-.9-2.1-2.1c0-1.2.9-2.1 2.1-2.1c1.1 0 2.1.9 2.1 2.1s-1 2.1-2.1 2.1zm15.1 12.9H21v-5.6c0-1.3 0-3.1-1.9-3.1S17 17.1 17 18.5v5.7h-3.5V13h3.3v1.5h.1c.5-.9 1.7-1.9 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5v6.2z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669c1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12 2c-2.716 0-3.056.012-4.123.06c-1.064.049-1.791.218-2.427.465a4.901 4.901 0 0 0-1.772 1.153A4.902 4.902 0 0 0 2.525 5.45c-.247.636-.416 1.363-.465 2.427C2.011 8.944 2 9.284 2 12s.011 3.056.06 4.123c.049 1.064.218 1.791.465 2.427a4.903 4.903 0 0 0 1.153 1.772a4.903 4.903 0 0 0 1.772 1.153c.636.247 1.363.416 2.427.465c1.067.048 1.407.06 4.123.06s3.056-.012 4.123-.06c1.064-.049 1.791-.218 2.427-.465a4.902 4.902 0 0 0 1.772-1.153a4.902 4.902 0 0 0 1.153-1.772c.247-.636.416-1.363.465-2.427c.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.218-1.791-.465-2.427a4.902 4.902 0 0 0-1.153-1.772a4.901 4.901 0 0 0-1.772-1.153c-.636-.247-1.363-.416-2.427-.465C15.056 2.012 14.716 2 12 2m0 1.802c2.67 0 2.986.01 4.04.058c.976.045 1.505.207 1.858.344c.466.182.8.399 1.15.748c.35.35.566.684.748 1.15c.136.353.3.882.344 1.857c.048 1.055.058 1.37.058 4.041c0 2.67-.01 2.986-.058 4.04c-.045.976-.208 1.505-.344 1.858a3.1 3.1 0 0 1-.748 1.15c-.35.35-.684.566-1.15.748c-.353.136-.882.3-1.857.344c-1.054.048-1.37.058-4.041.058c-2.67 0-2.987-.01-4.04-.058c-.976-.045-1.505-.208-1.858-.344a3.098 3.098 0 0 1-1.15-.748a3.098 3.098 0 0 1-.748-1.15c-.137-.353-.3-.882-.344-1.857c-.048-1.055-.058-1.37-.058-4.041c0-2.67.01-2.986.058-4.04c.045-.976.207-1.505.344-1.858c.182-.466.399-.8.748-1.15c.35-.35.684-.566 1.15-.748c.353-.137.882-.3 1.857-.344c1.055-.048 1.37-.058 4.041-.058m0 11.531a3.333 3.333 0 1 1 0-6.666a3.333 3.333 0 0 1 0 6.666m0-8.468a5.135 5.135 0 1 0 0 10.27a5.135 5.135 0 0 0 0-10.27m6.538-.203a1.2 1.2 0 1 1-2.4 0a1.2 1.2 0 0 1 2.4 0"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.693.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"/></svg>'
  };

  return { brand, hero, stats, why, venues, programmes, more, tools, app,
           trainers, testimonials, clientsColour, clientsWhite, heroColumns,
           press, cities, cityIntro, footer, icons };
})();
