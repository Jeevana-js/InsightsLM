
import { Globe, type LucideIcon } from 'lucide-react';

export interface Subject {
  name: string;
  slug: string;
  icon: LucideIcon;
  textbookContent: string;
}

export const subjects: Subject[] = [
  {
    name: 'Social Science',
    slug: 'social-science',
    icon: Globe,
    textbookContent: `
      History - Outbreak of World War I and Its Aftermath
      Imperialism: European powers' scramble for colonies in Asia and Africa created intense rivalries.
      Alliances: Europe was divided into two major alliance systems: the Triple Alliance (Germany, Austria-Hungary, Italy) and the Triple Entente (France, Russia, Britain).
      Militarism: An arms race, particularly the Anglo-German naval race, increased tensions.
      Aggressive Nationalism: Intense patriotism in countries like Serbia (Pan-Slavism) and France (desire to regain Alsace-Lorraine) fueled conflicts.
      The spark: Assassination of Archduke Franz Ferdinand of Austria-Hungary in Sarajevo on June 28, 1914.
      Course of the War: Trench warfare dominated the Western Front, leading to a stalemate and massive casualties. Key battles include the Marne, Verdun, and the Somme.
      Russian Revolution (1917): Internal turmoil led to Russia's withdrawal from the war after the Bolsheviks came to power.
      Entry of the USA (1917): Unrestricted submarine warfare by Germany and the Zimmermann Telegram brought the US into the war, tipping the balance.
      End of War: The armistice was signed on November 11, 1918.
      Treaty of Versailles (1919): Imposed harsh terms on Germany, including the 'War Guilt Clause', heavy reparations, and territorial losses, which sowed the seeds for future conflict.
      League of Nations: Formed to prevent future wars, but was largely ineffective due to the absence of major powers like the USA.

      History - The World between two World Wars
      The Great Depression: Started with the US stock market crash in 1929. Led to global economic collapse, mass unemployment, and protectionism.
      Impact of the Depression: Created political instability and fertile ground for extremist ideologies.
      Rise of Fascism in Italy: Benito Mussolini and his Blackshirts seized power in 1922, establishing a totalitarian, nationalistic regime. He dismantled democracy and suppressed all opposition.
      Rise of Nazism in Germany: Adolf Hitler and the Nazi Party exploited economic hardship and national resentment over the Versailles Treaty. Hitler became Chancellor in 1933, establishing the Third Reich. He implemented policies of racial purity (Nuremberg Laws) and aggressive expansionism.
      Anti-Colonial Movements in Asia: In India, the freedom struggle intensified under Gandhi. In China, Nationalists and Communists vied for control. Vietnam saw the rise of Ho Chi Minh's independence movement.
      Anti-Colonial Movements in Africa: Pan-Africanism grew, and nationalist movements began to organize, demanding greater rights and eventually independence.

      History - World War II
      Causes: Aggressive policies of Hitler (violating the Versailles Treaty, annexing Austria and Czechoslovakia), Mussolini (invading Ethiopia), and Japan (invading Manchuria and China). The failure of the League of Nations and the policy of appeasement by Britain and France emboldened the Axis powers.
      The Spark: Germany's invasion of Poland on September 1, 1939.
      Course of the War: Germany's 'Blitzkrieg' (lightning war) tactics led to the rapid fall of France. The Battle of Britain was a major air campaign won by the UK. Operation Barbarossa, the German invasion of the Soviet Union in 1941, opened the Eastern Front.
      The Pacific War: Japan's surprise attack on Pearl Harbor on December 7, 1941, brought the USA into the war.
      The Holocaust: The systematic, state-sponsored genocide of six million Jews by the Nazi regime.
      Turning Points: The Battle of Stalingrad on the Eastern Front and the D-Day landings in Normandy (1944) on the Western Front were crucial turning points.
      End of the War: Germany surrendered in May 1945. The war in Asia ended after the US dropped atomic bombs on Hiroshima and Nagasaki in August 1945.
      Consequences: Unprecedented destruction and loss of life, the division of Germany, and the beginning of the Cold War. The United Nations was formed to replace the League of Nations.

      History - The World after World War II
      The Cold War: An ideological and geopolitical struggle between the democratic, capitalist USA and the communist Soviet Union.
      The Iron Curtain: The division of Europe into Western and Eastern blocs. Germany was divided into West and East Germany.
      Containment Policy: The US adopted a policy to contain the spread of communism, leading to the Truman Doctrine and the Marshall Plan to rebuild Western Europe.
      Military Alliances: NATO (North Atlantic Treaty Organization) was formed by the US and its allies. The USSR responded with the Warsaw Pact.
      Key Conflicts: The Berlin Blockade and Airlift (1948-49), the Korean War (1950-53), the Vietnam War (1955-75), and the Cuban Missile Crisis (1962), which brought the world to the brink of nuclear war.
      Non-Aligned Movement (NAM): Founded by leaders of newly independent nations like India, Egypt, and Yugoslavia to stay independent of the two superpower blocs.
      Disintegration of the USSR: Economic stagnation, nationalist pressures, and the reforms of Mikhail Gorbachev (Glasnost and Perestroika) led to the collapse of the Soviet Union in 1991, ending the Cold War.

      History - Social and Religious Reform Movements in the 19th Century
      Context: Indian society in the 19th century was plagued by social evils like the caste system, sati, child marriage, and the suppression of women.
      Brahmo Samaj (1828): Founded by Raja Ram Mohan Roy in Bengal. He advocated for monotheism, reason, and modern education. He campaigned successfully for the abolition of Sati.
      Arya Samaj (1875): Founded by Swami Dayanand Saraswati. He gave the call 'Go back to the Vedas' and opposed idol worship, caste system, and child marriage. He promoted education for women and widow remarriage.
      Prarthana Samaj (1867): A reform movement in Bombay that focused on social reforms like inter-caste dining, inter-caste marriage, and widow remarriage.
      Ramakrishna Mission: Founded by Swami Vivekananda, based on the teachings of his guru Sri Ramakrishna Paramahamsa. Vivekananda emphasized spiritualism, service to humanity, and national regeneration.
      Other Reformers: Ishwar Chandra Vidyasagar was a key figure in the widow remarriage movement. Jyotiba Phule in Maharashtra worked for the upliftment of lower castes and education for women. Sir Syed Ahmed Khan worked for the social and educational advancement of Muslims through the Aligarh Movement.

      History - Early Revolts against British Rule in Tamil Nadu
      Palaiyakkarar System: A system of administrative divisions in Tamil Nadu. The Palaiyakkarars (Poligars) were local chieftains who often resisted British attempts to control their territory.
      Puli Thevar: One of the earliest to rebel against the British in the 1750s. He formed a confederacy of Palaiyakkarars to oppose the British and the Nawab of Arcot.
      Veerapandiya Kattabomman: The chieftain of Panchalankurichi who defied the British and was publicly hanged in 1799, becoming a folk hero.
      Marudhu Brothers: Leaders of the South Indian Rebellion of 1801. They issued a proclamation of independence and waged a fierce guerrilla war against the British.
      Dheeran Chinnamalai: Fought against the British in the Kongu region and was hanged in 1805.
      Vellore Mutiny (1806): An uprising by Indian sepoys in the Vellore Fort against new, culturally insensitive regulations. Though suppressed, it was a significant precursor to the 1857 Revolt.

      History - Anti-Colonial Movements and the Birth of Nationalism
      Causes for Rise of Nationalism: The economic exploitation of India, political unification under British rule, introduction of modern education and Western ideas, the role of the press, and social and religious reform movements.
      Socio-economic impact of British Rule: De-industrialization, ruin of artisans, commercialization of agriculture leading to famines, and the drain of wealth from India.
      Early Political Associations: The Madras Native Association, the Bombay Association, and the Indian Association were formed to voice Indian grievances.
      Indian National Congress (INC): Founded in 1885 by A.O. Hume. It provided an all-India platform for political activity.
      Moderate Phase (1885-1905): Early leaders like Dadabhai Naoroji, Surendranath Banerjee, and Gopal Krishna Gokhale used constitutional methods of petitions and appeals.
      Partition of Bengal (1905): A 'divide and rule' policy by Lord Curzon that sparked massive protests and the Swadeshi Movement, leading to a more assertive phase of nationalism.

      History - Nationalism Gandhian Phase
      Arrival of Gandhi (1915): Gandhi returned from South Africa, where he had developed his technique of Satyagraha (truth force).
      Early Satyagrahas: Champaran (1917) for indigo farmers, Kheda (1918) for peasants, and Ahmedabad Mill Strike (1918) for textile workers.
      Rowlatt Satyagraha (1919): A nationwide protest against the repressive Rowlatt Act, which led to the Jallianwala Bagh massacre.
      Non-Cooperation Movement (1920-22): A mass movement calling for a boycott of British goods, courts, and councils. It was called off after the Chauri Chaura incident.
      Civil Disobedience Movement (1930-34): Launched with the Dandi Salt March, where Gandhi broke the British salt law. It involved widespread defiance of British laws.
      Quit India Movement (1942): A mass uprising launched with Gandhi's call to 'Do or Die', demanding an immediate end to British rule.
      Partition and Independence: The British government, weakened by World War II, agreed to grant independence but partitioned the country into India and Pakistan. India became independent on August 15, 1947.

      History - Freedom Struggle in Tamil Nadu
      Early Phase: The Swadeshi Movement in Tamil Nadu was led by leaders like V.O. Chidambaram Pillai (who started a Swadeshi shipping company), Subramania Siva, and the revolutionary poet Subramania Bharati.
      Role of C. Rajagopalachari: A prominent Gandhian leader. He led the Vedaranyam Salt Satyagraha in 1930, a march parallel to the Dandi March. He later became the Chief Minister of Madras.
      Role of K. Kamaraj: A key nationalist leader who participated in numerous protests and spent years in jail. He later became a prominent Chief Minister of Tamil Nadu, known for his educational reforms.
      Tiruppur Kumaran: A young revolutionary who was killed while holding the Indian flag during a protest in Tiruppur. He is revered as 'Kodi Kaatha Kumaran'.
      Role of Press: Newspapers like 'The Hindu' and 'Swadesamitran' played a crucial role in spreading nationalist ideas and mobilizing the public.

      History - Social Transformation in Tamil Nadu
      Dravidian Movement: A movement that challenged the dominance of Brahminical and Sanskritic culture, advocating for the rights and identity of Dravidian people.
      Self-Respect Movement: Launched by Periyar E.V. Ramasamy in 1925. It fought against the caste system, religious superstition, and the subjugation of women. It promoted rationalism, atheism, and Self-Respect Marriages without Brahmin priests.
      Periyar E.V. Ramasamy: A radical social reformer who advocated for the eradication of caste, women's rights (including property rights and right to divorce), and the upliftment of backward classes.
      C.N. Annadurai: A follower of Periyar who later founded the Dravida Munnetra Kazhagam (DMK). He used popular culture (films, plays) to spread reformist ideas and became the first non-Congress Chief Minister of Tamil Nadu.
      Reservation Policy: The movements led to the implementation of reservation in government jobs and education for backward classes, a cornerstone of social justice policy in Tamil Nadu.

      Geography - India - Location, Relief and Drainage
      Location and Size: India is located in the Northern Hemisphere. It is the 7th largest country in the world. The Tropic of Cancer passes through the middle of the country.
      Major Physical Divisions:
      The Himalayan Mountains: A young fold mountain range, divided into the Greater Himalayas (Himadri), Lesser Himalayas (Himachal), and Outer Himalayas (Shiwaliks).
      The Great Northern Plains: Formed by the alluvial deposits of the Indus, Ganga, and Brahmaputra rivers. It is a very fertile region.
      The Peninsular Plateau: A triangular-shaped tableland composed of old crystalline rocks. It consists of the Central Highlands and the Deccan Plateau. The Western Ghats and Eastern Ghats are its western and eastern edges.
      The Indian Desert: The Thar Desert, located in the west.
      The Coastal Plains: The Western Coastal Plains and the Eastern Coastal Plains.
      The Islands: The Andaman and Nicobar Islands in the Bay of Bengal and the Lakshadweep Islands in the Arabian Sea.
      Drainage Systems:
      Himalayan Rivers: Perennial rivers like the Indus, Ganga, and Brahmaputra, fed by rain and melting snow.
      Peninsular Rivers: Seasonal rivers like Mahanadi, Godavari, Krishna, Cauvery (east-flowing) and Narmada, Tapti (west-flowing).

      Geography - Climate and Natural Vegetation of India
      Factors Influencing Climate: Latitude, altitude, distance from the sea, monsoon winds, and relief features.
      The Monsoon: The climate of India is dominated by monsoon winds. The South-West Monsoon brings rain to most of the country from June to September. The North-East Monsoon brings rain to the Tamil Nadu coast from October to December.
      Seasons: India has four distinct seasons: Winter (Jan-Feb), Summer (Mar-May), South-West Monsoon Season (Jun-Sep), and Retreating Monsoon Season (Oct-Dec).
      Natural Vegetation Types:
      Tropical Evergreen Forests: Found in high rainfall areas like the Western Ghats.
      Tropical Deciduous Forests (Monsoon Forests): The most widespread forests in India.
      Tropical Thorn Forests and Scrubs: Found in arid regions of Rajasthan and Gujarat.
      Montane Forests: Found in the Himalayas, with vegetation changing with altitude.
      Mangrove Forests: Found in the deltas of major rivers, like the Sundarbans.

      Geography - India - Agriculture
      Types of Farming: Subsistence farming, commercial farming, plantation agriculture.
      Agricultural Seasons: Kharif (sown in monsoon, e.g., rice), Rabi (sown in winter, e.g., wheat), and Zaid (summer crop, e.g., watermelon).
      Major Food Crops: Rice (staple food, grown in high-rainfall areas), Wheat (staple in north India), Millets (jowar, bajra, ragi).
      Major Cash Crops: Sugarcane, Cotton (major raw material for textile industry), Jute (the golden fiber), Oilseeds (e.g., groundnut, mustard).
      Plantation Crops: Tea (grown in Assam, West Bengal), Coffee (grown in Karnataka, Kerala, Tamil Nadu).
      Green Revolution: A period in the 1960s when modern agricultural techniques (HYV seeds, fertilizers, irrigation) dramatically increased food grain production, especially wheat and rice.
      Challenges: Dependence on monsoon, soil degradation, fragmentation of landholdings, and farmer debt.

      Geography - India - Resources and Industries
      Mineral Resources:
      Iron Ore: India has large reserves. Key states are Odisha, Jharkhand, Chhattisgarh.
      Manganese: Used in steelmaking. Key states are Odisha, Madhya Pradesh.
      Bauxite: The ore of aluminum. Key states are Odisha, Gujarat.
      Mica: India is a leading producer. Key states are Andhra Pradesh, Rajasthan.
      Energy Resources:
      Coal: The most abundant fossil fuel in India. Key states are Jharkhand, Odisha, West Bengal.
      Petroleum: Found in offshore fields like Mumbai High, and onshore in Assam and Gujarat.
      Natural Gas: Found along with petroleum reserves.
      Non-Conventional Energy: Solar, wind, biogas, and tidal energy are being developed to reduce dependence on fossil fuels.
      Major Industries:
      Iron and Steel Industry: Concentrated in the Chotanagpur plateau region.
      Cotton Textile Industry: One of the oldest industries, with centers in Maharashtra and Gujarat.
      Jute Industry: Concentrated along the Hooghly river in West Bengal.
      Sugar Industry: Major states are Uttar Pradesh and Maharashtra.
      Information Technology (IT) Industry: A major global player with hubs in Bengaluru, Hyderabad, and Pune.

      Geography - India - Population, Transport, Communication & Trade
      Population: India is the second most populous country in the world.
      Population Distribution and Density: Very uneven. The Northern Plains are densely populated, while mountainous and desert regions are sparsely populated.
      Population Growth: The rate of growth has been slowing down but is still high.
      Transport:
      Roadways: A vast network of National Highways, State Highways, and other roads.
      Railways: The principal mode of transportation for freight and passengers in India.
      Waterways: Important for bulky goods. Includes inland waterways and oceanic routes.
      Airways: Connects major cities and remote areas, crucial for long-distance travel.
      Communication: Includes personal communication (postal service, internet, telephone) and mass communication (radio, television, newspapers).
      Foreign Trade: India exports items like software, textiles, and gems, and imports items like petroleum, machinery, and electronic goods.

      Geography - Physical Geography of Tamil Nadu
      Location and Physiography: Located in the southernmost part of the Indian peninsula. Divided into the Western Ghats, Eastern Ghats, Plateaus, Coastal Plains, and Inland Plains.
      The Western Ghats are a continuous range, while the Eastern Ghats are discontinuous. The highest peak is Doddabetta in the Nilgiris.
      Drainage: Major rivers include Cauvery, Palar, Ponnaiyar, Vaigai, and Thamirabarani. Most rivers flow eastwards and drain into the Bay of Bengal.
      Climate: Tropical climate. Receives rainfall from both South-West and North-East monsoons, with the latter being more significant.
      Soils: Major soil types include alluvial, black, red, and laterite soils, which influence the agricultural patterns.
      Natural Vegetation: Ranges from evergreen forests in the Western Ghats to scrub forests in drier inland areas.

      Geography - Human Geography of Tamil Nadu
      Agriculture: The mainstay of the state's economy. The Cauvery delta is known as the 'Rice Bowl of Tamil Nadu'. Other major crops include sugarcane, cotton, and groundnut.
      Water Resources: Relies heavily on rivers and monsoon rains. Water management, through dams and tanks, is crucial.
      Mineral Resources: Rich in lignite (at Neyveli), limestone, magnesite, and bauxite.
      Industries: One of the most industrialized states. Known for its textile industry (Tiruppur, Coimbatore), automotive industry (Chennai is the 'Detroit of Asia'), and electronics manufacturing.
      Population: Densely populated, with a high level of urbanization.
      Transport: Well-developed network of roads, railways, and has major ports (Chennai, Thoothukudi) and international airports.

      Civics - Indian Constitution
      Making of the Constitution: Drafted by the Constituent Assembly, which took nearly 3 years. Dr. B.R. Ambedkar was the chairman of the Drafting Committee.
      Preamble: The introduction to the Constitution. It declares India to be a Sovereign, Socialist, Secular, and Democratic Republic.
      Fundamental Rights: Part III of the Constitution guarantees six fundamental rights to all citizens, such as the Right to Equality and the Right to Freedom. These are justiciable.
      Fundamental Duties: Added later, these are a set of moral obligations on all citizens.
      Directive Principles of State Policy (DPSP): Part IV of the Constitution contains guidelines for the government to follow for the welfare of the people. These are non-justiciable.
      Features: It is the lengthiest written constitution in the world. It is a blend of rigidity (amendment is difficult) and flexibility (amendment is easy). It provides for a parliamentary system of government and an independent judiciary.

      Civics - Central Government
      Union Executive:
      The President: The nominal head of the state. Elected indirectly. Has executive, legislative, and judicial powers.
      The Vice-President: Ex-officio Chairman of the Rajya Sabha.
      The Prime Minister: The real head of the government. Leader of the majority party in the Lok Sabha.
      Council of Ministers: Appointed by the President on the advice of the Prime Minister. They are collectively responsible to the Lok Sabha.
      Union Legislature (Parliament):
      Lok Sabha (House of the People): The lower house, directly elected by the people for a term of 5 years.
      Rajya Sabha (Council of States): The upper house, representing the states. It is a permanent body, and its members are elected for 6-year terms.

      Civics - State Government
      State Executive:
      The Governor: The nominal head of the state, appointed by the President.
      The Chief Minister: The real head of the state government, leader of the majority party in the State Legislative Assembly.
      Council of Ministers: Appointed by the Governor on the advice of the Chief Minister. They are collectively responsible to the State Legislative Assembly.
      State Legislature: Can be unicameral (only a Legislative Assembly - Vidhan Sabha) or bicameral (having both a Legislative Assembly and a Legislative Council - Vidhan Parishad).

      Civics - India's Foreign Policy
      Basic Principles: Based on the promotion of world peace, non-alignment, and anti-colonialism.
      Panchsheel: The five principles of peaceful coexistence, signed with China in 1954.
      Non-Alignment: A policy of not aligning with any major power bloc (USA or USSR) during the Cold War. India was a founding member of the Non-Aligned Movement (NAM).
      Relations with Neighbors: India seeks peaceful and friendly relations with its neighbors. It plays a key role in regional organizations like SAARC (South Asian Association for Regional Cooperation).
      Current Focus: Includes strengthening economic ties, dealing with regional security challenges, and playing a larger role on the global stage.

      Civics - India's International Relations
      Role in the UN: India is a founding member of the United Nations and has been a major contributor to its peacekeeping operations.
      Regional Cooperation: India is a leading member of SAARC and has an active 'Look East' policy, now 'Act East', to strengthen ties with Southeast Asian nations (ASEAN).
      BRICS: India is a member of this grouping of emerging economies (Brazil, Russia, India, China, South Africa), which aims to promote peace, security, and development.
      Global Issues: India takes a firm stand on issues like nuclear disarmament, climate change, and combating international terrorism.

      Economics - Gross Domestic Product (GDP) and its Growth
      Definition of GDP: The total market value of all final goods and services produced within a country in a given period of time. It is a key indicator of economic health.
      Methods of Calculating GDP: Expenditure method, Income method, and Value-added method.
      Sectors of the Economy:
      Primary Sector: Involves the extraction of raw materials (e.g., agriculture, mining).
      Secondary Sector: Involves manufacturing and industry (e.g., car manufacturing, construction).
      Tertiary Sector: Involves providing services (e.g., banking, IT, tourism).
      Contribution to GDP: Over time, the contribution of the tertiary sector to India's GDP has increased significantly, while that of the primary sector has declined. This is a common trend in developing economies.

      Economics - Globalization and Trade
      Definition of Globalization: The process of rapid integration or interconnection between countries. It is driven by increased trade, investment, and technology.
      Multinational Corporations (MNCs): Companies that own or control production in more than one country. They play a key role in globalization by setting up factories and investing in foreign countries.
      International Trade: The exchange of goods and services between countries. It allows countries to specialize in what they produce best and import what they need.
      World Trade Organization (WTO): An international organization that sets the rules for global trade. Its aim is to promote free and fair trade between nations.

      Economics - Food Security and Nutrition
      Definition of Food Security: It means availability, accessibility, and affordability of food to all people at all times.
      Dimensions:
      Availability: Food production within the country and imports.
      Accessibility: Food is within reach of every person.
      Affordability: People have enough money to buy sufficient, safe, and nutritious food.
      Public Distribution System (PDS): A government-sponsored system where essential food grains are distributed at subsidized prices through ration shops.
      Buffer Stock: A stock of food grains (like wheat and rice) procured by the government through the Food Corporation of India (FCI) to distribute during shortages.
      Nutrition: Ensuring the intake of a balanced diet for overall health and well-being. Malnutrition is a major public health challenge.

      Economics - Government and Taxes
      Role of Government: To provide public goods and services (like defense, roads, healthcare, education), maintain law and order, and regulate the economy.
      Why Taxes are Levied: To raise revenue to finance government expenditure.
      Types of Taxes:
      Direct Taxes: Levied on the income and property of individuals and companies. The burden cannot be shifted (e.g., Income Tax, Corporate Tax).
      Indirect Taxes: Levied on goods and services. The burden can be shifted to the consumer (e.g., Goods and Services Tax - GST).
      Government Budget: An annual statement of the estimated receipts and expenditure of the government for a financial year.

      Economics - Industrial Clusters in Tamil Nadu
      Definition of Industrial Cluster: A geographical concentration of interconnected companies and institutions in a particular field. They promote efficiency, innovation, and competition.
      Textile Clusters: Tamil Nadu is known as the 'Manchester of South India'. Key clusters are in Coimbatore (spinning mills), Tiruppur (knitwear and hosiery, known as 'Knitwear Capital'), and Erode (turmeric and textiles).
      Automotive Cluster: Centered around Chennai, often called the 'Detroit of Asia'. It is home to major vehicle manufacturers and auto component industries.
      Leather Cluster: Concentrated in towns like Ambur, Vaniyambadi, and Ranipet. Tamil Nadu is a major exporter of leather goods.
      Electronics Cluster: Sriperumbudur and Oragadam near Chennai have emerged as major hubs for electronics manufacturing.
      Factors for Growth: Availability of skilled labor, supportive government policies, and a strong network of educational and research institutions.
    `,
  },
];
