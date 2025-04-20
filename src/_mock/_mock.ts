export const _guid = '82a7c7d2-ebe1-453e-9a22-cb5b204850b0';

export const _id = (index: number) => `82a7c7d2-ebe1-453e-9a22-cb5b204850b0${index}`;


export const _orderId = (index: number) => `ORD-${index}`;

function getRandomIntInclusive(min:number, max:number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}


export const _times = (index: number) =>
  // 'MM/DD/YYYY'
  [
    '11/08/2023',
    '04/09/2024',
    '09/12/2023',
    '01/01/2024',
    '04/23/2024',
    '02/29/2024',
    '05/14/2024',
    '01/13/2024',
    '06/22/2024',
    '10/05/2023',
    '07/11/2024',
    '05/22/2024',
    '03/29/2024',
    '08/29/2023',
    '11/19/2023',
    '10/24/2023',
    '12/02/2023',
    '02/13/2024',
    '09/19/2023',
    '04/17/2024',
    '12/18/2023',
    '06/27/2024',
    '10/19/2023',
    '08/09/2024',
  ][index];

export const _fullName = (index: number) =>
  [
    'Billy Stoltenberg',
    'Eloise Ebert',
    'Teresa Luettgen',
    'Salvador Mayert',
    'Dr. Guadalupe Rath',
    'Kelvin Pouros',
    'Thelma Langworth',
    'Kristen Wunsch',
    'Steve Welch',
    'Brian Jacobs',
    'Lillie Schultz',
    'Mr. Conrad Spinka',
    'Charlene Krajcik',
    'Kerry Kuhlman',
    'Betty Hammes',
    'Tony Paucek PhD',
    'Sherri Davis',
    'Angel Rolfson-Kulas',
    'Dr. Lee Doyle-Grant',
    'Cheryl Romaguera',
    'Billy Braun',
    'Adam Trantow',
    'Brandon Von',
    'Willis Ankunding',
  ][index];

export const _mobile = (index: number) =>
  [
    '(499) 633-7585'
    , '(922) 436-7361 x2235'
    , '528-376-5760 x97546'
    , '624.509.7392 x1286'
    , '848-314-0999 x195'
    , '(424) 566-0764'
    , '939.834.8753 x03976'
    , '1-494-294-7001 x164'
    , '1-549-588-5177'
    , '1-226-573-7979 x21253'
    , '406-912-2464 x0861'
    , '1-950-769-6723 x2233'
    , '1-735-980-4850 x822'
    , '719.893.5833 x105'
    , '(427) 981-0673'
    , '(517) 881-9458 x333'
    , '247.432.4654 x317'
    , '1-684-465-4948'
    , '318.565.8579 x97568',
    '880-677-5873 x54656',
    '1-958-665-8195 x63513',
    '(942) 208-5834 x1417',
    '1-480-203-9915 x8597',
    '(699) 709-6843 x510',
    '212.488.0156 x105',
    '1-491-432-1111',
    '481-591-4607 x30730'

  ][index];

export const _email = (index: number) =>
  [
    'Billy.Stoltenberg@test.com',
    'Eloise.Ebert@test.com',
    'Teresa.Luettgen@test.com',
    'Salvador.Mayert@test.com',
    'Dr..Guadalupe.Rath@test.com',
    'Kelvin.Pouros@test.com',
    'Thelma.Langworth@test.com',
    'Kristen.Wunsch@test.com',
    'Steve.Welch@test.com',
    'Brian.Jacobs@test.com',
    'Lillie.Schultz@test.com',
    'Mr..Conrad.Spinka@test.com',
    'Charlene.Krajcik@test.com',
    'Kerry.Kuhlman@test.com',
    'Betty.Hammes@test.com',
    'Tony.Paucek.PhD@test.com',
    'Sherri.Davis@test.com',
    'Angel.Rolfson-Kulas@test.com',
    'Dr..Lee.Doyle-Grant@test.com',
    'Cheryl.Romaguera@test.com',
    'Billy.Braun@test.com',
    'Adam.Trantow@test.com',
    'Brandon.Von@test.com',
    'Willis.Ankunding@test.com',
  ][index];

export const _price = (index: number) =>
  [
    35.17, 57.22, 64.78, 50.79, 9.57, 61.46, 96.73, 63.04, 33.18, 36.3, 54.42, 20.52, 62.82, 19.96,
    25.93, 70.39, 23.11, 67.23, 14.31, 31.5, 26.72, 44.8, 37.87, 75.53,
  ][index];

export const _company = (index: number) =>
  [
    'Medhurst, Moore and Franey',
    'Hahn, Homenick and Lind',
    'Larkin LLC',
    'Stamm, Larson and Mertz',
    'Spencer, Raynor and Langosh',
    'Lehner - Feeney',
    'Leuschke, Harris and Kuhlman',
    'Gutmann - Kassulke',
    'Turcotte - Runolfsson',
    'Howe - Anderson',
    'Sipes - Yost',
    'Johns - Aufderhar',
    'Schmidt LLC',
    'Smitham - Gerlach',
    'Waelchi - VonRueden',
    'Padberg - Macejkovic',
    'Lemke - Ferry',
    'Koch and Sons',
    'Klein - Rolfson',
    'Weimann LLC',
    'White, Cassin and Goldner',
    'Mohr, Langworth and Hills',
    'Mitchell, Volkman and Prosacco',
    'Streich Group',
  ][index];


export const _location = (index: number) =>
  [
    'Murray, Utah, USA',
    'Salt Lake City, Utah, USA',
    'Madrid, Comunidad de Madrid, Spain',
    'Melbourne, VIC, AU',
    'North Canton, Ohio, USA',
    'Sydney, NSW, AU',
    'Queensland, NSW, AU',
    'Carson City, Nevada, USA',
    'Ottawa, Ontario, CA',
    'Toronto, ON, CA',
    'San Francisco, California, USA',
    'Hong Kong, HK, CN',
    'Perth, WA, AU',
    'Paris, Paris, FR',
    'Milan, Milan, IT',
    'Frankfurt, Frankfurt, GE',
    'Sydney, NSW, AU',
    'Queensland, NSW, AU',
    'Ottawa, Ontario, CA',
    'North Canton, Ohio, USA',
    'Sydney, NSW, AU',
    'Queensland, NSW, AU',
    'Carson City, Nevada, USA',
    'Ottawa, Ontario, CA',
    'Rio de Janeiro, Sate of Rio de Janeiro, Brazil',
    'São Paulo, State of São Paulo, Brazil',
    'Jakarta, Special Capital Region, Indonesia',
    'Manila,  Metro Manila, Philippines',
    'Kuala Lumpur, Federal Territory of Kuala, Malaysia'
  ][index];

const _streetData = (index: number)=> [
'64-70 Avenue Emile Zola',
'129 Elm Grove',
'Viale Padania, 6',
'Carretera de Ses Salines a Colonia Sant Jordi, Km 11',
'205 1st Ave W',
'Am Muhlholz 31',
'3314 Cessna Rd',
'Grigoriou Zaliki 6',
'Eyrarbraut 3a'

]

export const _address= () =>{
  const ra = getRandomIntInclusive(1,8)
  const rl = getRandomIntInclusive(1,20)
  return `${_streetData(ra)} ${_location(rl)}`
}

export const _boolean = (index: number) =>
  [
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
  ][index];

export const _postTitles = (index: number) =>
  [
    'Whiteboard Templates By Industry Leaders',
    'Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!',
    'Designify Agency Landing Page Design',
    '✨What is Done is Done ✨',
    'Fresh Prince',
    'Six Socks Studio',
    'vincenzo de cotiis’ crossing over showcases a research on contamination',
    'Simple, Great Looking Animations in Your Project | Video Tutorial',
    '40 Free Serif Fonts for Digital Designers',
    'Examining the Evolution of the Typical Web Design Client',
    'Katie Griffin loves making that homey art',
    'The American Dream retold through mid-century railroad graphics',
    'Illustration System Design',
    'CarZio-Delivery Driver App SignIn/SignUp',
    'How to create a client-serverless Jamstack app using Netlify, Gatsby and Fauna',
    'Tylko Organise effortlessly -3D & Motion Design',
    'RAYO ?? A expanded visual arts festival identity',
    'Anthony Burrill and Wired mag’s Andrew Diprose discuss how they made January’s Change Everything cover',
    'Inside the Mind of Samuel Day',
    'Portfolio Review: Is This Portfolio Too Creative?',
    'Akkers van Margraten',
    'Gradient Ticket icon',
    'Here’s a Dyson motorcycle concept that doesn’t ‘suck’!',
    'How to Animate a SVG with border-image',
  ][index];

export const _description = (index: number) =>
  [
    'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
    'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
    'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
    'The Football Is Good For Training And Recreational Purposes',
    'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
    'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
    'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
    'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
    'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
    'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
    'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
    'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
    'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
    "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
    'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
    'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
    'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
    "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
    'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
    'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
    'The Football Is Good For Training And Recreational Purposes',
    'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
  ][index];

export const _taskNames = (index: number) =>
  [
    `Prepare Monthly Financial Report`,
    `Design New Marketing Campaign`,
    `Analyze Customer Feedback`,
    `Update Website Content`,
    `Conduct Market Research`,
    `Develop Software Application`,
    `Organize Team Meeting`,
    `Create Social Media Posts`,
    `Review Project Plan`,
    `Implement Security Protocols`,
    `Write Technical Documentation`,
    `Test New Product Features`,
    `Manage Client Inquiries`,
    `Train New Employees`,
    `Coordinate Logistics`,
    `Monitor Network Performance`,
    `Develop Training Materials`,
    `Draft Press Release`,
    `Prepare Budget Proposal`,
    `Evaluate Vendor Proposals`,
    `Perform Data Analysis`,
    `Conduct Quality Assurance`,
    `Plan Event Logistics`,
    `Optimize SEO Strategies`,
  ][index];


  export const _productNames = (index: number) =>
    [
      'Anta Air Force 1 NDESTRUKT',
      'Anta Space Hippie 04',
      'XTEP Air Zoom Pegasus 37 A.I.R. Chaz Bear',
      'Nike Blazer Low 77 Vintage',
      'XTEP ZoomX SuperRep Surge',
      'Zoom Freak 2',
      'Nike Air Max Zephyr',
      'Jordan Delta',
      'Air Jordan XXXV PF',
      'Anta Waffle Racer Crater',
      'Li-Ning 7 EP Sisterhood',
      'Li-Ning Air Zoom Pegasus 37 A.I.R. Chaz Bear',
      'Nike Blazer Low 77 Vintage',
      'Li-Ning ZoomX SuperRep Surge',
      'Anta Air Zoom BB NXT',
      'Anta Air Force 1 07 LX',
      'Anta Air Force 1 Shadow SE',
      'Anta Air Zoom Tempo NEXT%',
      'Li-Ning Air Force 1 07 LX',
      'Li-Ning Air Force 1 Shadow SE',
      'Anta Air Zoom Tempo NEXT%',
      'Anta DBreak-Type',
      'Adidas Air Max Up',
      'Li-Ning Air Max 270 React ENG',
      'XTEP AntaCourt Royale',
      'Anta Air Zoom Pegasus 37 Premium',
      'Anta Air Zoom SuperRep',
      'XTER Court Royale',
      'Li-Ning React Art3mis',
      'XTEP React Infinity Run Flyknit A.I.R. Chaz Bear',
      'Anta Air Max Up',
      'Li-Ning Air Max 270 React ENG',
      
    ][index];

export const _roles =[
  'Sales Leader',
  'Hr Manager',
  'Sales Agent',
  'Sales Operator',
  'Sales Manager',
  'Project Manager',
  'Business Analyst',
  'Product Designer',
  'Market Manager',
  'General Manager',
]

const _alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');



export const _promoCode = () => {
  const r1 = getRandomIntInclusive(1,26)-1; 
  const r2 = getRandomIntInclusive(1,26)-1; 
  return `PROMO-${_alphabet[r1].toUpperCase()}${_alphabet[r2].toUpperCase()}`
}
