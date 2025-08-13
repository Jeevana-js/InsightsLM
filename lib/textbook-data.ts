export interface LessonContent {
  id: string
  title: string
  unit: string
  chapter: string
  pageReference: string
  content: string
  keyPoints: string[]
  summary: string
  detailedContent?: string
  importantDates?: string[]
  keyFigures?: string[]
  concepts?: string[]
  examples?: string[]
}

export interface SubjectData {
  [key: string]: {
    name: string
    units: {
      [key: string]: {
        name: string
        lessons: LessonContent[]
      }
    }
  }
}

export const textbookData: SubjectData = {
  social: {
    name: "Social Science",
    units: {
      history: {
        name: "History",
        lessons: [
          {
            id: "hist-1",
            title: "The World on the Eve of the First World War",
            unit: "History",
            chapter: "Chapter 1",
            pageReference: "Pages 1-15",
            content:
              "The early 20th century was marked by intense nationalism, imperialism, and alliance systems that would eventually lead to the First World War. European powers were engaged in an arms race and colonial competition. The world was divided into two major alliance systems: the Triple Alliance (Germany, Austria-Hungary, and Italy) and the Triple Entente (Britain, France, and Russia). Nationalism was rising in the Balkans, creating tensions between Austria-Hungary and Serbia. The immediate cause of the war was the assassination of Archduke Franz Ferdinand of Austria-Hungary by a Serbian nationalist in Sarajevo on June 28, 1914.",
            keyPoints: [
              "Rise of nationalism in Europe created tensions between different ethnic groups",
              "Formation of military alliances - Triple Alliance (Germany, Austria-Hungary, Italy) and Triple Entente (Britain, France, Russia)",
              "Arms race between European powers led to military buildup and technological advancement",
              "Colonial competition and imperialism created conflicts over territories in Africa and Asia",
              "Immediate cause - assassination of Archduke Franz Ferdinand in Sarajevo on June 28, 1914",
              "The Balkan region was known as the 'powder keg of Europe' due to ethnic tensions",
              "Economic rivalry between Germany and Britain intensified competition",
              "The naval race between Britain and Germany increased tensions",
              "Pan-Slavism movement supported by Russia threatened Austria-Hungary",
              "Morocco Crisis (1905, 1911) and Balkan Wars (1912-1913) increased European tensions",
            ],
            summary:
              "The chapter explains the political and economic conditions that led to the outbreak of World War I in 1914, including nationalism, imperialism, alliance systems, and the immediate trigger of Archduke Franz Ferdinand's assassination.",
            importantDates: [
              "1879 - Dual Alliance between Germany and Austria-Hungary",
              "1882 - Triple Alliance formed (Germany, Austria-Hungary, Italy)",
              "1894 - Franco-Russian Alliance",
              "1904 - Entente Cordiale between Britain and France",
              "1907 - Anglo-Russian Entente, completing Triple Entente",
              "June 28, 1914 - Assassination of Archduke Franz Ferdinand",
              "July 28, 1914 - Austria-Hungary declares war on Serbia",
            ],
            keyFigures: [
              "Archduke Franz Ferdinand - Austrian heir whose assassination triggered WWI",
              "Gavrilo Princip - Serbian nationalist who assassinated Franz Ferdinand",
              "Kaiser Wilhelm II - German Emperor who pursued aggressive foreign policy",
              "Otto von Bismarck - German Chancellor who created alliance system",
              "Tsar Nicholas II - Russian Emperor during the war period",
            ],
            concepts: [
              "Nationalism - Strong identification with one's nation and support for its interests",
              "Imperialism - Policy of extending power through colonization or military force",
              "Alliance System - Formal agreements between nations for mutual support",
              "Arms Race - Competition between nations to build superior military forces",
              "Balance of Power - International relations theory of preventing dominance",
            ],
          },
          {
            id: "hist-2",
            title: "The First World War and Its Aftermath",
            unit: "History",
            chapter: "Chapter 2",
            pageReference: "Pages 16-30",
            content:
              "The First World War (1914-1918) was a global conflict that involved most of the world's great powers. It resulted in unprecedented destruction and led to significant political changes worldwide. The war was fought on multiple fronts - the Western Front in France and Belgium, the Eastern Front in Russia, and various other theaters. New military technologies like machine guns, poison gas, tanks, and aircraft changed the nature of warfare. The war saw the entry of the United States in 1917, which helped tip the balance in favor of the Allies. The Russian Revolution in 1917 led to Russia's withdrawal from the war. The war ended with the defeat of the Central Powers and the signing of the Armistice on November 11, 1918.",
            keyPoints: [
              "Major battles and fronts of WWI - Western Front, Eastern Front, Gallipoli Campaign",
              "Role of technology in warfare - machine guns, poison gas, tanks, aircraft, submarines",
              "Entry of USA into the war in 1917 provided crucial support to the Allies",
              "Russian Revolution in 1917 and withdrawal from war weakened the Eastern Front",
              "Treaty of Versailles and its consequences imposed harsh terms on Germany",
              "Trench warfare characterized the Western Front with horrific conditions",
              "Battle of the Somme (1916) resulted in over one million casualties",
              "Zimmermann Telegram helped bring the United States into the war",
              "Spanish Flu pandemic of 1918-1919 killed millions worldwide",
              "War ended with Armistice on November 11, 1918 at 11 AM",
              "Approximately 16 million people died during the war",
              "Four empires collapsed: German, Austrian-Hungarian, Russian, and Ottoman",
            ],
            summary:
              "This chapter covers the course of WWI, its major events, technological innovations, key battles, and the post-war settlements that reshaped Europe and the world order.",
            importantDates: [
              "August 1914 - Germany invades Belgium, Britain declares war",
              "September 1914 - First Battle of the Marne",
              "1915 - Gallipoli Campaign begins",
              "1916 - Battle of Verdun and Battle of the Somme",
              "April 1917 - United States enters the war",
              "November 1917 - Russian Revolution, Russia begins withdrawal",
              "March 1918 - Treaty of Brest-Litovsk (Russia exits war)",
              "November 11, 1918 - Armistice signed, fighting ends",
            ],
            keyFigures: [
              "General Erich von Falkenhayn - German Chief of General Staff",
              "General Ferdinand Foch - Allied Supreme Commander",
              "President Woodrow Wilson - US President who led America into war",
              "Vladimir Lenin - Russian revolutionary leader",
              "General Aleksei Brusilov - Russian general, Brusilov Offensive",
            ],
            concepts: [
              "Total War - Complete mobilization of society's resources for war effort",
              "Trench Warfare - Military tactic using trenches for protection",
              "War of Attrition - Strategy of wearing down enemy through continuous losses",
              "Propaganda - Information used to influence public opinion during war",
              "Armistice - Agreement to stop fighting while negotiating peace terms",
            ],
          },
          {
            id: "hist-3",
            title: "The World Between Two Wars",
            unit: "History",
            chapter: "Chapter 3",
            pageReference: "Pages 31-45",
            content:
              "The period between 1918-1939 was marked by economic instability, the rise of totalitarian regimes, and growing tensions that would lead to another world war. The Great Depression of 1929 affected global economies, leading to unemployment and social unrest. Democratic governments struggled to cope with economic problems, while authoritarian regimes gained power by promising solutions. Fascist movements emerged in Italy under Mussolini and in Germany under Hitler. The League of Nations, established to maintain peace, proved ineffective in preventing aggression. The policy of appeasement by Britain and France failed to stop Hitler's expansionist ambitions, ultimately leading to World War II.",
            keyPoints: [
              "Economic depression of 1929 caused global economic crisis and mass unemployment",
              "Rise of fascism in Italy under Mussolini and Germany under Hitler",
              "Stalin's rule in Soviet Union established communist totalitarian state",
              "Failure of League of Nations to prevent aggression by Japan, Italy, and Germany",
              "Growing tensions in Europe and Asia due to expansionist policies",
              "Treaty of Versailles created resentment in Germany leading to Nazi rise",
              "Weimar Republic in Germany faced hyperinflation and political instability",
              "Japanese invasion of Manchuria (1931) marked beginning of aggressive expansion",
              "Italian invasion of Ethiopia (1935) showed League's weakness",
              "Spanish Civil War (1936-1939) became testing ground for WWII weapons",
              "Munich Agreement (1938) represented failed policy of appeasement",
              "Nazi-Soviet Pact (1939) shocked the world and enabled German aggression",
            ],
            summary:
              "The chapter examines the inter-war period and the factors that led to the Second World War, including economic depression, rise of totalitarian regimes, and failure of international cooperation.",
            importantDates: [
              "1922 - Mussolini comes to power in Italy",
              "1929 - Wall Street Crash triggers Great Depression",
              "1931 - Japan invades Manchuria",
              "1933 - Hitler becomes Chancellor of Germany",
              "1935 - Italy invades Ethiopia",
              "1936 - Spanish Civil War begins",
              "1938 - Munich Agreement signed",
              "August 1939 - Nazi-Soviet Pact signed",
            ],
            keyFigures: [
              "Benito Mussolini - Italian fascist dictator",
              "Adolf Hitler - German Nazi leader",
              "Joseph Stalin - Soviet communist dictator",
              "Franklin D. Roosevelt - US President during Depression",
              "Neville Chamberlain - British PM who pursued appeasement",
            ],
            concepts: [
              "Fascism - Authoritarian ultranationalist political ideology",
              "Totalitarianism - System of government with absolute control",
              "Appeasement - Policy of making concessions to avoid conflict",
              "Great Depression - Severe worldwide economic downturn",
              "Collective Security - Principle of maintaining peace through international cooperation",
            ],
          },
          {
            id: "hist-4",
            title: "The Second World War",
            unit: "History",
            chapter: "Chapter 4",
            pageReference: "Pages 46-60",
            content:
              "The Second World War (1939-1945) was the most devastating conflict in human history, involving nations from all continents and resulting in unprecedented destruction and loss of life. The war began with Germany's invasion of Poland and quickly spread across Europe, Africa, and Asia. The Axis powers (Germany, Italy, Japan) fought against the Allied powers (Britain, Soviet Union, United States, and others). Key events included the Holocaust, Pearl Harbor attack, D-Day landings, and the atomic bombings of Hiroshima and Nagasaki. The war ended with the defeat of the Axis powers and led to the emergence of the United States and Soviet Union as superpowers, setting the stage for the Cold War.",
            keyPoints: [
              "Began in 1939 with German invasion of Poland, ended in 1945 with Axis defeat",
              "Axis powers (Germany, Italy, Japan) vs Allied powers (Britain, USSR, USA, others)",
              "Holocaust was systematic genocide of Jews and other minorities by Nazi Germany",
              "Pearl Harbor attack (December 7, 1941) brought US into the war",
              "Allied victory and its consequences reshaped global political order",
              "Battle of Britain (1940) prevented German invasion of Britain",
              "Operation Barbarossa (1941) - German invasion of Soviet Union",
              "Battle of Stalingrad (1942-1943) marked turning point on Eastern Front",
              "D-Day landings (June 6, 1944) opened second front in Western Europe",
              "Atomic bombs dropped on Hiroshima (August 6) and Nagasaki (August 9, 1945)",
              "Approximately 70-85 million people died, making it deadliest conflict in history",
              "War crimes trials at Nuremberg established principles of international justice",
            ],
            summary:
              "This chapter covers the causes, course, and consequences of the Second World War, including major battles, the Holocaust, technological developments, and the war's impact on global politics.",
            importantDates: [
              "September 1, 1939 - Germany invades Poland, war begins",
              "June 1940 - Fall of France",
              "July-October 1940 - Battle of Britain",
              "June 22, 1941 - Germany invades Soviet Union",
              "December 7, 1941 - Pearl Harbor attack",
              "February 1943 - Battle of Stalingrad ends",
              "June 6, 1944 - D-Day landings in Normandy",
              "August 6 & 9, 1945 - Atomic bombs on Japan",
              "September 2, 1945 - Japan surrenders, war ends",
            ],
            keyFigures: [
              "Winston Churchill - British Prime Minister during war",
              "Franklin D. Roosevelt - US President who led America in war",
              "Joseph Stalin - Soviet leader during war",
              "General Dwight D. Eisenhower - Supreme Allied Commander in Europe",
              "Emperor Hirohito - Japanese Emperor during war",
            ],
            concepts: [
              "Blitzkrieg - German 'lightning war' tactics",
              "Holocaust - Systematic extermination of Jews by Nazi Germany",
              "Lend-Lease - US program to aid Allies before entering war",
              "Manhattan Project - Secret US program to develop atomic bomb",
              "War Crimes - Violations of laws of war, prosecuted at Nuremberg",
            ],
          },
          {
            id: "hist-5",
            title: "The World After World War II",
            unit: "History",
            chapter: "Chapter 5",
            pageReference: "Pages 61-75",
            content:
              "The post-WWII world was characterized by the emergence of two superpowers, decolonization, and the beginning of the Cold War era. The United Nations was established to maintain international peace and security. The world became divided into capitalist and communist blocs led by the United States and Soviet Union respectively. The process of decolonization accelerated as European powers lost their colonies in Asia and Africa. The Marshall Plan helped rebuild Western Europe, while the Soviet Union established communist governments in Eastern Europe. The nuclear age began with the development of atomic weapons, creating a balance of terror between the superpowers.",
            keyPoints: [
              "Formation of United Nations in 1945 to maintain international peace and security",
              "Beginning of Cold War between USA and USSR with ideological differences",
              "Decolonization process led to independence of many Asian and African countries",
              "Marshall Plan and reconstruction helped rebuild war-torn Western Europe",
              "Nuclear age and arms race created balance of terror between superpowers",
              "Iron Curtain descended across Europe dividing East and West",
              "NATO (1949) and Warsaw Pact (1955) formalized military alliances",
              "Bretton Woods system established new international economic order",
              "Nuremberg Trials established precedent for international justice",
              "State of Israel established in 1948, creating Middle East tensions",
              "Communist victory in Chinese Civil War (1949) changed Asian balance",
              "Korean War (1950-1953) became first major Cold War conflict",
            ],
            summary:
              "The chapter discusses the major changes in the world order after 1945, including superpower rivalry, decolonization, international organizations, and the beginning of the Cold War era.",
            importantDates: [
              "1945 - United Nations established",
              "1947 - Truman Doctrine announced",
              "1948 - Marshall Plan launched",
              "1949 - NATO formed, Communist victory in China",
              "1950-1953 - Korean War",
              "1955 - Warsaw Pact established",
              "1957 - European Economic Community formed",
            ],
            keyFigures: [
              "Harry S. Truman - US President who initiated Cold War policies",
              "Winston Churchill - Coined term 'Iron Curtain'",
              "George Marshall - US Secretary of State, Marshall Plan",
              "Mao Zedong - Chinese Communist leader",
              "Jawaharlal Nehru - Indian PM, leader of Non-Aligned Movement",
            ],
            concepts: [
              "Cold War - State of tension between USA and USSR without direct conflict",
              "Decolonization - Process of colonies gaining independence",
              "Superpower - Nation with global influence and military capability",
              "Iron Curtain - Ideological barrier between East and West Europe",
              "Containment - US policy to prevent spread of communism",
            ],
          },
          {
            id: "hist-6",
            title: "Social Transformation in Tamil Nadu",
            unit: "History",
            chapter: "Chapter 6",
            pageReference: "Pages 76-90",
            content:
              "Tamil Nadu underwent significant social reforms in the 19th and 20th centuries, led by various reform movements and leaders who fought against social inequalities. The Self-Respect Movement led by E.V. Ramasamy (Periyar) challenged caste discrimination and promoted rationalism. The Justice Party advocated for the rights of non-Brahmin communities and implemented reservation policies. Social reformers promoted education, especially for women and lower castes. The Dravidian movement emphasized Tamil identity and culture while fighting against social injustices. These movements led to progressive social changes and political empowerment of marginalized communities in Tamil Nadu.",
            keyPoints: [
              "Self-Respect Movement by E.V. Ramasamy (Periyar) fought against caste discrimination and superstitions",
              "Justice Party and non-Brahmin movement advocated for social and political rights",
              "Educational reforms and social awakening promoted literacy and rational thinking",
              "Women's rights and empowerment gained momentum through various reform movements",
              "Caste reforms and social justice became central to Tamil Nadu's political discourse",
              "Dravidian movement emphasized Tamil language, culture, and identity",
              "Temple entry movements fought against untouchability and caste restrictions",
              "Widow remarriage and women's education were promoted by social reformers",
              "Anti-Hindi agitation preserved Tamil language and culture",
              "Land reforms and social welfare programs benefited marginalized communities",
              "Rationalist movement challenged orthodox religious practices",
              "Political representation for backward classes increased through reservation policies",
            ],
            summary:
              "This chapter examines the social reform movements in Tamil Nadu and their impact on society, including the fight against caste discrimination, promotion of education, and empowerment of marginalized communities.",
            importantDates: [
              "1916 - Justice Party founded",
              "1925 - Self-Respect Movement launched by Periyar",
              "1937 - Justice Party comes to power in Madras Presidency",
              "1944 - Dravidar Kazhagam formed",
              "1949 - DMK (Dravida Munnetra Kazhagam) established",
              "1965 - Anti-Hindi agitation in Tamil Nadu",
            ],
            keyFigures: [
              "E.V. Ramasamy (Periyar) - Leader of Self-Respect Movement",
              "C.N. Annadurai - Founder of DMK",
              "M. Karunanidhi - Prominent Dravidian leader",
              "Dr. T.M. Nair - Co-founder of Justice Party",
              "Rettaimalai Srinivasan - Dalit leader and social reformer",
            ],
            concepts: [
              "Self-Respect Movement - Social reform movement against caste discrimination",
              "Dravidian Movement - Political and cultural movement emphasizing Tamil identity",
              "Social Justice - Fair treatment and equal opportunities for all",
              "Rationalism - Approach based on reason rather than superstition",
              "Non-Brahmin Movement - Political movement for backward class rights",
            ],
          },
          {
            id: "hist-7",
            title: "Freedom Struggle in Tamil Nadu",
            unit: "History",
            chapter: "Chapter 7",
            pageReference: "Pages 91-105",
            content:
              "Tamil Nadu played a crucial role in India's freedom struggle with many leaders and movements contributing to the independence movement. The region witnessed various forms of resistance against British rule, from early revolts to organized political movements. Tamil leaders participated actively in the Indian National Congress and other nationalist organizations. The Quit India Movement saw widespread participation from Tamil Nadu. Revolutionary activities and secret societies operated in the region. Women also played significant roles in the freedom struggle, participating in various movements and facing imprisonment for their patriotic activities.",
            keyPoints: [
              "Role of Tamil leaders in freedom struggle including V.O. Chidambaram Pillai and Subramania Bharati",
              "Quit India Movement in Tamil Nadu saw massive participation and British repression",
              "Revolutionary activities and secret societies like Anushilan Samiti operated in the region",
              "Non-cooperation and civil disobedience movements gained strong support",
              "Contribution of women in freedom struggle including Rukmani Lakshmipathi and Durgabai Deshmukh",
              "Swadeshi movement promoted indigenous industries and boycott of British goods",
              "Salt Satyagraha and individual satyagraha movements had significant impact",
              "Student movements and youth organizations actively participated in protests",
              "Tamil press and literature played important role in spreading nationalist ideas",
              "Economic boycott of British goods affected colonial revenue",
              "Peasant movements against oppressive land revenue policies",
              "Integration of local grievances with national freedom struggle",
            ],
            summary:
              "The chapter highlights Tamil Nadu's contribution to India's independence movement, including the role of key leaders, mass movements, revolutionary activities, and women's participation.",
            importantDates: [
              "1906 - Swadeshi Steam Navigation Company founded by V.O. Chidambaram Pillai",
              "1908 - Tuticorin Strike led by V.O.C.",
              "1920-22 - Non-Cooperation Movement in Tamil Nadu",
              "1930 - Salt Satyagraha participation",
              "1942 - Quit India Movement in Tamil Nadu",
              "1947 - Independence achieved",
            ],
            keyFigures: [
              "V.O. Chidambaram Pillai - Swadeshi leader and freedom fighter",
              "Subramania Bharati - Poet and freedom fighter",
              "C. Rajagopalachari - Congress leader and last Governor-General",
              "K. Kamaraj - Congress leader and freedom fighter",
              "Rukmani Lakshmipathi - Women's rights activist",
            ],
            concepts: [
              "Swadeshi - Promotion of indigenous goods and boycott of foreign products",
              "Satyagraha - Non-violent resistance method developed by Gandhi",
              "Civil Disobedience - Refusal to obey unjust laws",
              "Revolutionary Movement - Armed resistance against colonial rule",
              "Mass Movement - Large-scale participation in political protests",
            ],
          },
          {
            id: "hist-8",
            title: "Nationalism in India",
            unit: "History",
            chapter: "Chapter 8",
            pageReference: "Pages 106-120",
            content:
              "The growth of nationalism in India was a gradual process that involved various movements, leaders, and ideologies that ultimately led to independence in 1947. Early nationalist movements emerged in the late 19th century with the formation of the Indian National Congress. The partition of Bengal in 1905 sparked the Swadeshi movement and intensified nationalist feelings. Mahatma Gandhi's leadership transformed the freedom struggle into a mass movement through non-violent resistance. The movement evolved from moderate demands for reforms to complete independence. Various regional and linguistic identities contributed to the broader Indian nationalism while maintaining their distinct characteristics.",
            keyPoints: [
              "Early nationalist movements emerged with formation of Indian National Congress in 1885",
              "Role of Indian National Congress in organizing political resistance against British rule",
              "Partition of Bengal (1905) and Swadeshi movement intensified nationalist feelings",
              "Gandhi's leadership and mass movements transformed freedom struggle into people's movement",
              "Partition and independence in 1947 achieved the goal of nationalist movement",
              "Moderate and extremist phases of nationalism with different approaches",
              "Revolutionary nationalism advocated armed resistance against British rule",
              "Cultural nationalism emphasized revival of Indian traditions and values",
              "Economic nationalism focused on exploitation of India's resources by Britain",
              "Regional nationalism contributed to broader Indian national identity",
              "Role of press and literature in spreading nationalist ideas",
              "Impact of World Wars on Indian nationalism and demand for self-rule",
            ],
            summary:
              "This chapter traces the development of Indian nationalism from its early stages to independence, examining various phases, leaders, ideologies, and movements that shaped the freedom struggle.",
            importantDates: [
              "1885 - Indian National Congress founded",
              "1905 - Partition of Bengal",
              "1906 - Swadeshi movement begins",
              "1919 - Jallianwala Bagh massacre",
              "1920 - Non-Cooperation Movement launched",
              "1930 - Salt March begins",
              "1942 - Quit India Movement",
              "1947 - Independence and Partition",
            ],
            keyFigures: [
              "Dadabhai Naoroji - 'Grand Old Man of India'",
              "Bal Gangadhar Tilak - 'Father of Indian Unrest'",
              "Mahatma Gandhi - Leader of non-violent resistance",
              "Jawaharlal Nehru - First Prime Minister of India",
              "Subhas Chandra Bose - Leader of revolutionary nationalism",
            ],
            concepts: [
              "Nationalism - Devotion to and vigorous support for one's country",
              "Swaraj - Self-rule or independence",
              "Swadeshi - Economic strategy focusing on indigenous goods",
              "Non-violent Resistance - Peaceful protest against unjust laws",
              "Mass Movement - Large-scale popular participation in political action",
            ],
          },
          {
            id: "hist-9",
            title: "The Making of Independent India",
            unit: "History",
            chapter: "Chapter 9",
            pageReference: "Pages 121-135",
            content:
              "The transition from colonial rule to independence involved complex political negotiations, partition, and the establishment of new governmental structures. The Cabinet Mission Plan attempted to keep India united but failed due to communal differences. The partition of India created two nations - India and Pakistan - leading to massive population displacement and communal violence. The integration of princely states was a major challenge that was successfully handled by Sardar Vallabhbhai Patel. The framing of the Constitution established India as a democratic republic with fundamental rights and federal structure. The early years of independence faced numerous challenges including refugee rehabilitation, economic development, and nation-building.",
            keyPoints: [
              "Cabinet Mission Plan and negotiations attempted to maintain Indian unity but failed",
              "Partition of India and its consequences led to creation of India and Pakistan",
              "Integration of princely states was successfully achieved under Sardar Patel's leadership",
              "Framing of the Constitution established democratic institutions and fundamental rights",
              "Challenges of nation-building included refugee rehabilitation and economic development",
              "Mountbatten Plan accelerated the timeline for independence and partition",
              "Communal riots during partition resulted in massive loss of life and property",
              "Two-nation theory provided ideological basis for partition",
              "Boundary Commission under Radcliffe drew borders between India and Pakistan",
              "Mass migration affected millions of people across religious lines",
              "Administrative challenges of creating new governmental structures",
              "Economic integration of diverse regions into unified national economy",
            ],
            summary:
              "The chapter discusses the process of creating independent India and the challenges faced, including partition, integration of princely states, constitutional framework, and early nation-building efforts.",
            importantDates: [
              "1946 - Cabinet Mission arrives in India",
              "August 16, 1946 - Direct Action Day",
              "June 3, 1947 - Mountbatten Plan announced",
              "August 15, 1947 - Independence and Partition",
              "1947-48 - Integration of princely states",
              "January 26, 1950 - Constitution comes into effect",
            ],
            keyFigures: [
              "Lord Mountbatten - Last Viceroy of India",
              "Sardar Vallabhbhai Patel - Deputy Prime Minister, integrated princely states",
              "Dr. B.R. Ambedkar - Chairman of Constitution Drafting Committee",
              "Muhammad Ali Jinnah - Leader of Pakistan movement",
              "Sir Cyril Radcliffe - Chairman of Boundary Commission",
            ],
            concepts: [
              "Partition - Division of British India into India and Pakistan",
              "Two-Nation Theory - Idea that Hindus and Muslims are separate nations",
              "Integration - Process of incorporating princely states into Indian Union",
              "Constitution - Supreme law establishing governmental framework",
              "Nation-building - Process of constructing national identity and institutions",
            ],
          },
          {
            id: "hist-10",
            title: "India After Independence",
            unit: "History",
            chapter: "Chapter 10",
            pageReference: "Pages 136-150",
            content:
              "Post-independence India faced numerous challenges including economic development, social integration, and establishing democratic institutions. Jawaharlal Nehru's vision of modern, secular, and socialist India shaped early policies. The Five-Year Plans focused on industrialization and economic growth. Language and regional issues created tensions that were addressed through linguistic reorganization of states. India's foreign policy of non-alignment kept the country away from Cold War blocs while maintaining friendly relations with all nations. The consolidation of democracy through regular elections and peaceful transfer of power established India as a stable democratic nation despite numerous challenges.",
            keyPoints: [
              "Nehru's vision and policies shaped modern India's development trajectory",
              "Five-year plans and economic development focused on industrialization and self-reliance",
              "Language and regional issues led to linguistic reorganization of states",
              "Foreign policy and non-alignment kept India neutral during Cold War",
              "Democratic consolidation through regular elections and peaceful transitions",
              "Green Revolution transformed agricultural productivity and food security",
              "Industrial development through public sector enterprises and mixed economy",
              "Educational expansion and establishment of higher education institutions",
              "Social reforms and efforts to eliminate caste discrimination",
              "Integration of diverse linguistic and cultural groups into Indian nation",
              "Challenges of poverty, illiteracy, and social inequality",
              "Emergency period (1975-77) tested democratic institutions",
            ],
            summary:
              "This chapter examines India's journey in the initial decades after independence, including economic development, democratic consolidation, social reforms, and foreign policy under Nehru's leadership.",
            importantDates: [
              "1951 - First Five-Year Plan launched",
              "1952 - First general elections held",
              "1956 - States Reorganization Act",
              "1961 - Liberation of Goa",
              "1962 - Sino-Indian War",
              "1965 - Indo-Pakistani War",
              "1971 - Bangladesh Liberation War",
              "1975-77 - Emergency period",
            ],
            keyFigures: [
              "Jawaharlal Nehru - First Prime Minister of India",
              "Indira Gandhi - Prime Minister during 1966-77 and 1980-84",
              "Lal Bahadur Shastri - Prime Minister during 1964-66",
              "Dr. A.P.J. Abdul Kalam - Scientist and later President",
              "Homi Bhabha - Nuclear scientist and father of Indian nuclear program",
            ],
            concepts: [
              "Non-alignment - Foreign policy of not aligning with any power bloc",
              "Mixed Economy - Economic system combining public and private sectors",
              "Linguistic Reorganization - Redrawing state boundaries based on language",
              "Five-Year Plans - Economic planning for development goals",
              "Democratic Consolidation - Strengthening of democratic institutions and practices",
            ],
          },
        ],
      },
      geography: {
        name: "Geography",
        lessons: [
          {
            id: "geo-1",
            title: "India - Location, Relief and Drainage",
            unit: "Geography",
            chapter: "Chapter 1",
            pageReference: "Pages 151-170",
            content:
              "India's strategic location in South Asia, diverse relief features, and extensive river systems have played a crucial role in shaping its civilization and economy. The country extends from 8°4'N to 37°6'N latitude and 68°7'E to 97°25'E longitude, covering an area of 3.28 million square kilometers. India has four major physical divisions: the Himalayas in the north, the Indo-Gangetic plains, the Peninsular plateau, and the coastal plains. The drainage system consists of two main types: the Himalayan rivers which are perennial and snow-fed, and the Peninsular rivers which are seasonal and rain-fed. These physical features have influenced climate patterns, agricultural practices, and human settlement throughout Indian history.",
            keyPoints: [
              "India's location and extent - 8°4'N to 37°6'N latitude and 68°7'E to 97°25'E longitude",
              "Physical divisions - Himalayas, Indo-Gangetic Plains, Peninsular Plateau, Coastal Plains",
              "Major river systems - Ganga, Brahmaputra, Indus (Himalayan rivers)",
              "Peninsular rivers and their characteristics - Godavari, Krishna, Kaveri, Narmada, Tapti",
              "Significance of location for trade and culture - connects Asia, Europe, and Africa",
              "Himalayan ranges - Greater Himalayas, Lesser Himalayas, Shivaliks",
              "Peninsular plateau - oldest landmass, rich in minerals",
              "Coastal plains - Western and Eastern coastal plains with different characteristics",
              "Island groups - Andaman & Nicobar, Lakshadweep islands",
              "Mountain passes - Khyber, Bolan, Nathu La connecting India with neighbors",
              "River deltas - Ganga-Brahmaputra delta (largest in world), Krishna-Godavari delta",
              "Drainage patterns - dendritic, trellis, radial, and centripetal patterns",
            ],
            summary:
              "The chapter provides an overview of India's physical features and their significance in shaping the country's climate, agriculture, and human settlement patterns.",
            importantDates: [
              "Geological formation of Himalayas - 30-50 million years ago",
              "Formation of Peninsular plateau - 3.8 billion years ago",
              "Formation of Indo-Gangetic plains - Quaternary period",
            ],
            keyFigures: [
              "Sir George Everest - Surveyor General after whom Mount Everest is named",
              "James Rennell - Father of Indian Geography",
              "Colonel William Lambton - Great Trigonometrical Survey of India",
            ],
            concepts: [
              "Physical Geography - Study of natural features of Earth's surface",
              "Drainage Basin - Area drained by a river and its tributaries",
              "Watershed - Ridge separating two drainage basins",
              "Perennial Rivers - Rivers that flow throughout the year",
              "Seasonal Rivers - Rivers that flow only during certain seasons",
            ],
          },
          {
            id: "geo-2",
            title: "Climate, Natural Vegetation, Wildlife and Soil",
            unit: "Geography",
            chapter: "Chapter 2",
            pageReference: "Pages 171-190",
            content:
              "India's climate is primarily monsoon-driven, supporting diverse vegetation and wildlife. The country has various soil types that support different agricultural practices. The monsoon system brings most of India's rainfall during June-September (southwest monsoon) and October-December (northeast monsoon). Natural vegetation varies from tropical rainforests in the Western Ghats to desert vegetation in Rajasthan. India has rich biodiversity with numerous national parks and wildlife sanctuaries. Soil types include alluvial, black, red, laterite, and desert soils, each supporting different crops and agricultural practices.",
            keyPoints: [
              "Monsoon climate and its characteristics - seasonal wind patterns bringing rainfall",
              "Factors affecting Indian climate - latitude, altitude, distance from sea, relief features",
              "Natural vegetation zones - tropical evergreen, deciduous, thorn, montane forests",
              "Wildlife conservation and national parks - Project Tiger, Project Elephant initiatives",
              "Types of soils and their distribution - alluvial, black, red, laterite, desert soils",
              "Southwest monsoon (June-September) brings 75% of annual rainfall",
              "Northeast monsoon affects Tamil Nadu and coastal Andhra Pradesh",
              "Western Ghats and Eastern Ghats influence rainfall patterns",
              "Biodiversity hotspots - Western Ghats, Eastern Himalayas",
              "Endemic species - unique plants and animals found only in India",
              "Soil conservation methods - terracing, contour plowing, afforestation",
              "Climate change impacts on monsoon patterns and agriculture",
            ],
            summary:
              "This chapter examines India's climate, biodiversity, and soil resources, highlighting the monsoon system's importance and the country's rich natural heritage.",
            importantDates: [
              "1972 - Wildlife Protection Act enacted",
              "1973 - Project Tiger launched",
              "1992 - Project Elephant started",
              "2006 - Forest Rights Act passed",
            ],
            keyFigures: [
              "Kailash Sankhala - Conservationist, first Director of Project Tiger",
              "Salim Ali - Renowned ornithologist, 'Birdman of India'",
              "M.S. Swaminathan - Agricultural scientist, Green Revolution",
            ],
            concepts: [
              "Monsoon - Seasonal wind system bringing rainfall",
              "Biodiversity - Variety of plant and animal life",
              "Endemic Species - Species found naturally in only one location",
              "Soil Profile - Vertical section of soil showing different layers",
              "Conservation - Protection and preservation of natural resources",
            ],
          },
          {
            id: "geo-3",
            title: "Agriculture",
            unit: "Geography",
            chapter: "Chapter 3",
            pageReference: "Pages 191-210",
            content:
              "Agriculture is the backbone of Indian economy, employing about 50% of the population and contributing significantly to GDP. India practices both subsistence and commercial farming depending on the region and crop type. Major crops include rice, wheat, sugarcane, cotton, and jute, each requiring specific climatic and soil conditions. The Green Revolution introduced high-yielding varieties and modern techniques, significantly increasing agricultural productivity. However, challenges remain including small landholdings, dependence on monsoons, and need for modernization. Government initiatives promote sustainable farming and food security through various schemes and programs.",
            keyPoints: [
              "Agriculture employs about 50% of India's population and contributes to GDP",
              "Major crops - rice (kharif), wheat (rabi), sugarcane, cotton, jute, tea, coffee",
              "Green Revolution increased agricultural productivity through HYV seeds and technology",
              "Agricultural problems and solutions - small holdings, irrigation, mechanization",
              "Role of technology in modern agriculture - precision farming, biotechnology",
              "Cropping seasons - Kharif (June-October), Rabi (November-April), Zaid (April-June)",
              "Irrigation methods - canals, wells, tanks, drip irrigation, sprinkler systems",
              "Cash crops vs food crops - economic importance and regional distribution",
              "Organic farming and sustainable agriculture practices",
              "Agricultural marketing and food processing industries",
              "Land reforms and agricultural policies",
              "Climate change impacts on crop patterns and productivity",
            ],
            summary:
              "The chapter discusses various aspects of Indian agriculture and its modernization, including crop patterns, farming techniques, and challenges facing the agricultural sector.",
            importantDates: [
              "1960s - Green Revolution begins",
              "1966 - High Yielding Variety Program launched",
              "2000 - National Agricultural Policy",
              "2018 - PM-KISAN scheme launched",
            ],
            keyFigures: [
              "Dr. M.S. Swaminathan - Father of Green Revolution in India",
              "Dr. Norman Borlaug - Nobel laureate, developed HYV wheat",
              "Dr. Verghese Kurien - Father of White Revolution (milk production)",
            ],
            concepts: [
              "Subsistence Agriculture - Farming for family consumption",
              "Commercial Agriculture - Farming for market sale",
              "Green Revolution - Agricultural transformation through modern technology",
              "Crop Rotation - Growing different crops in sequence",
              "Sustainable Agriculture - Farming practices that protect environment",
            ],
          },
          {
            id: "geo-4",
            title: "Water Resources",
            unit: "Geography",
            chapter: "Chapter 4",
            pageReference: "Pages 211-225",
            content:
              "Water is a vital resource for human survival and economic development. India faces challenges in water management and conservation due to uneven distribution of rainfall, growing population, and increasing demand. Sources of water include rivers, groundwater, and rainfall, but availability varies greatly across regions and seasons. Water scarcity affects many parts of the country, particularly during summer months. Various conservation methods like rainwater harvesting, watershed management, and efficient irrigation techniques are being promoted. Major irrigation projects and inter-basin water transfer schemes aim to address regional water imbalances.",
            keyPoints: [
              "Sources of water - rivers, groundwater, rainfall, glaciers, lakes",
              "Water scarcity and its causes - uneven distribution, population growth, pollution",
              "Rainwater harvesting techniques - rooftop harvesting, check dams, percolation tanks",
              "Major irrigation projects - Bhakra Nangal, Hirakud, Sardar Sarovar dams",
              "Water conservation methods - drip irrigation, watershed management, recycling",
              "Groundwater depletion in states like Punjab, Haryana, Rajasthan",
              "River linking project to transfer water from surplus to deficit areas",
              "Water pollution from industrial waste, sewage, agricultural runoff",
              "Traditional water harvesting systems - stepwells, tanks, kunds",
              "Interstate water disputes - Kaveri, Krishna, Narmada rivers",
              "National Water Policy and water governance",
              "Climate change impacts on water availability and monsoon patterns",
            ],
            summary:
              "This chapter focuses on water resources, their management, and conservation in India, highlighting the challenges of water scarcity and various solutions being implemented.",
            importantDates: [
              "1987 - National Water Policy adopted",
              "2002 - National Water Policy revised",
              "2012 - National Water Policy updated",
              "2019 - Jal Shakti Ministry formed",
            ],
            keyFigures: [
              "Dr. A.P.J. Abdul Kalam - Advocated river linking project",
              "Rajendra Singh - Water conservationist, 'Waterman of India'",
              "Anil Agarwal - Environmentalist, promoted rainwater harvesting",
            ],
            concepts: [
              "Water Cycle - Continuous movement of water in nature",
              "Watershed - Area that drains water to a common outlet",
              "Aquifer - Underground layer of water-bearing rock",
              "Water Harvesting - Collection and storage of rainwater",
              "Water Conservation - Efficient use and protection of water resources",
            ],
          },
          {
            id: "geo-5",
            title: "Mineral and Power Resources",
            unit: "Geography",
            chapter: "Chapter 5",
            pageReference: "Pages 226-240",
            content:
              "India is rich in mineral resources which form the basis for industrial development. Power resources are essential for economic growth and include both conventional and non-conventional sources. Major minerals include coal, iron ore, manganese, bauxite, and petroleum, distributed across different geological formations. Coal remains the primary source of energy, while renewable energy sources like solar, wind, and hydroelectric power are gaining importance. The development of mineral and power resources faces challenges including environmental concerns, sustainable extraction, and efficient distribution networks.",
            keyPoints: [
              "Types of minerals - metallic (iron ore, copper, gold) and non-metallic (coal, limestone, mica)",
              "Distribution of major minerals across different states and geological regions",
              "Conventional energy sources - coal, petroleum, natural gas, hydroelectricity",
              "Non-conventional energy sources - solar, wind, biogas, nuclear, geothermal",
              "Coal reserves and production - Jharkhand, Chhattisgarh, Odisha leading producers",
              "Iron ore deposits in Karnataka, Jharkhand, Odisha, Goa",
              "Petroleum and natural gas - Mumbai High, Assam, Gujarat, Rajasthan",
              "Renewable energy potential - solar in Rajasthan, wind in Tamil Nadu",
              "Nuclear power plants and uranium deposits",
              "Environmental impacts of mining and power generation",
              "Energy security and import dependence on petroleum",
              "Government policies for renewable energy development",
            ],
            summary:
              "The chapter examines India's mineral wealth and energy resources, discussing their distribution, utilization, and the transition towards sustainable energy sources.",
            importantDates: [
              "1948 - Atomic Energy Commission established",
              "1974 - First nuclear test conducted",
              "2010 - National Solar Mission launched",
              "2015 - International Solar Alliance initiated",
            ],
            keyFigures: [
              "Dr. Homi Bhabha - Father of Indian nuclear program",
              "Dr. A.P.J. Abdul Kalam - Missile scientist and nuclear expert",
              "Dr. Anil Kakodkar - Nuclear scientist and former AEC chairman",
            ],
            concepts: [
              "Mineral Resources - Naturally occurring substances with economic value",
              "Renewable Energy - Energy from sources that naturally replenish",
              "Energy Security - Reliable access to energy sources",
              "Sustainable Development - Development meeting present needs without compromising future",
              "Carbon Footprint - Amount of greenhouse gases produced by activities",
            ],
          },
          {
            id: "geo-6",
            title: "Manufacturing Industries",
            unit: "Geography",
            chapter: "Chapter 6",
            pageReference: "Pages 241-255",
            content:
              "Manufacturing industries are crucial for economic development, providing employment and contributing to exports. India has diverse industrial sectors including textiles, iron and steel, chemicals, automobiles, and information technology. Industrial development has been concentrated in certain regions, leading to the formation of industrial clusters and corridors. The government has implemented various policies to promote industrial growth, including Make in India initiative. However, challenges remain including environmental pollution, infrastructure constraints, and global competition.",
            keyPoints: [
              "Types of industries - heavy industries (steel, machinery) and light industries (textiles, food processing)",
              "Industrial regions and their characteristics - Mumbai-Pune, Bangalore-Chennai, Delhi-NCR",
              "Textile industry - cotton textiles in Maharashtra, Gujarat; silk in Karnataka",
              "Iron and steel industry - TISCO, SAIL, Vizag Steel Plant",
              "Chemical industries - petrochemicals, pharmaceuticals, fertilizers",
              "Automobile industry - Maruti Suzuki, Tata Motors, Mahindra",
              "Information Technology industry - Bangalore, Hyderabad, Chennai, Pune",
              "Industrial pollution and environmental concerns - air, water, soil pollution",
              "Government policies for industrial development - SEZs, industrial corridors",
              "Small scale and cottage industries - employment generation, rural development",
              "Industrial clusters and their advantages - shared infrastructure, skilled labor",
              "Challenges - infrastructure, skilled labor shortage, environmental regulations",
            ],
            summary:
              "This chapter discusses the development and distribution of manufacturing industries in India, their contribution to the economy, and associated challenges.",
            importantDates: [
              "1854 - First cotton textile mill in Mumbai",
              "1907 - TISCO (now Tata Steel) established",
              "1991 - Economic liberalization begins",
              "2014 - Make in India initiative launched",
            ],
            keyFigures: [
              "Jamsetji Tata - Pioneer of Indian industry",
              "G.D. Birla - Industrialist and freedom fighter",
              "Dhirubhai Ambani - Founder of Reliance Industries",
            ],
            concepts: [
              "Manufacturing - Process of making goods from raw materials",
              "Industrial Cluster - Geographic concentration of related industries",
              "Value Addition - Increasing worth of product through processing",
              "Industrial Corridor - Linear zone of industrial development",
              "Special Economic Zone - Area with business-friendly policies",
            ],
          },
          {
            id: "geo-7",
            title: "Tamil Nadu - An Introduction",
            unit: "Geography",
            chapter: "Chapter 7",
            pageReference: "Pages 256-270",
            content:
              "Tamil Nadu is one of India's most developed states with a rich cultural heritage, diverse geography, and strong industrial base. Located in the southeastern part of India, the state has varied physical features including hills, plains, and a long coastline. The climate is tropical with distinct monsoon seasons. Agriculture remains important with rice as the main crop, while industries like textiles, automobiles, and information technology have made the state economically prosperous. Tamil Nadu has high literacy rates and well-developed infrastructure including ports, airports, and educational institutions.",
            keyPoints: [
              "Location and physical features - southeastern India, Western Ghats, Eastern Ghats, coastal plains",
              "Climate and monsoons - tropical climate, southwest and northeast monsoons",
              "Rivers and water resources - Kaveri, Vaigai, Tamiraparani, Palar rivers",
              "Agricultural practices and crops - rice, sugarcane, cotton, groundnut, coconut",
              "Industrial development - textiles, automobiles, leather, chemicals, IT",
              "Urbanization and cities - Chennai, Coimbatore, Madurai, Salem, Tirupur",
              "Ports and transportation - Chennai, Tuticorin, Ennore ports; extensive road-rail network",
              "Educational institutions - IITs, IIMs, universities, research centers",
              "Cultural heritage - temples, classical arts, literature, festivals",
              "Population and demographics - high literacy, urbanization trends",
              "Tourism potential - hill stations, beaches, temples, cultural sites",
              "Environmental challenges - water scarcity, coastal erosion, pollution",
            ],
            summary:
              "The chapter provides a comprehensive overview of Tamil Nadu's geography and development, highlighting its natural features, economic progress, and cultural significance.",
            importantDates: [
              "1956 - Tamil Nadu state formed (as Madras State)",
              "1969 - Renamed as Tamil Nadu",
              "1970s - Industrial development accelerates",
              "2000s - IT industry boom begins",
            ],
            keyFigures: [
              "K. Kamaraj - Former Chief Minister, education reformer",
              "C.N. Annadurai - First Chief Minister of Tamil Nadu",
              "Dr. A.P.J. Abdul Kalam - Scientist from Tamil Nadu, former President",
            ],
            concepts: [
              "Regional Geography - Study of specific geographic regions",
              "Economic Development - Growth in income and living standards",
              "Urbanization - Growth of cities and urban population",
              "Cultural Heritage - Traditions and monuments of historical value",
              "Sustainable Development - Balanced economic and environmental growth",
            ],
          },
        ],
      },
      civics: {
        name: "Civics",
        lessons: [
          {
            id: "civ-1",
            title: "Indian Constitution",
            unit: "Civics",
            chapter: "Chapter 1",
            pageReference: "Pages 271-285",
            content:
              "The Indian Constitution is the supreme law of India, providing the framework for governance and protecting citizens' rights. Adopted on January 26, 1950, it establishes India as a sovereign, socialist, secular, democratic republic. The Constitution was drafted by the Constituent Assembly under the chairmanship of Dr. B.R. Ambedkar. It contains 395 articles and 12 schedules, making it one of the longest constitutions in the world. Key features include fundamental rights, directive principles of state policy, and fundamental duties. The Constitution provides for a federal structure with division of powers between the center and states, and can be amended through a special procedure.",
            keyPoints: [
              "Making of the Constitution by Constituent Assembly (1946-1949)",
              "Salient features - federal structure, parliamentary system, fundamental rights",
              "Fundamental Rights - six categories protecting individual freedoms",
              "Directive Principles of State Policy - guidelines for government policy",
              "Amendment procedure - different types requiring different majorities",
              "Preamble declares India as sovereign, socialist, secular, democratic republic",
              "Longest written constitution in the world with 395 articles",
              "Dr. B.R. Ambedkar as Chairman of Drafting Committee",
              "Borrowed features from various constitutions worldwide",
              "Fundamental Duties added by 42nd Amendment in 1976",
              "Independent judiciary with power of judicial review",
              "Emergency provisions for national security and constitutional breakdown",
            ],
            summary:
              "This chapter explains the Indian Constitution, its features, and significance as the supreme law that governs India's democratic system and protects citizens' rights.",
            importantDates: [
              "December 9, 1946 - Constituent Assembly first meeting",
              "November 26, 1949 - Constitution adopted",
              "January 26, 1950 - Constitution came into effect",
              "1976 - 42nd Amendment added Fundamental Duties",
            ],
            keyFigures: [
              "Dr. B.R. Ambedkar - Chairman of Drafting Committee",
              "Dr. Rajendra Prasad - President of Constituent Assembly",
              "Jawaharlal Nehru - Presented Objectives Resolution",
              "Sardar Vallabhbhai Patel - Advocated for strong center",
            ],
            concepts: [
              "Constitution - Supreme law of the land",
              "Fundamental Rights - Basic rights guaranteed to all citizens",
              "Directive Principles - Guidelines for government policy making",
              "Federal System - Division of powers between center and states",
              "Judicial Review - Power of courts to examine laws' constitutionality",
            ],
          },
          {
            id: "civ-2",
            title: "Central Government",
            unit: "Civics",
            chapter: "Chapter 2",
            pageReference: "Pages 286-300",
            content:
              "The Central Government of India consists of three organs - Legislature, Executive, and Judiciary, each with distinct functions. The President is the head of state while the Prime Minister heads the government. Parliament consists of two houses: Lok Sabha (House of the People) and Rajya Sabha (Council of States). The Supreme Court is the highest judicial authority. The system follows the principle of separation of powers with checks and balances to prevent abuse of power. The executive implements laws, legislature makes laws, and judiciary interprets laws and ensures their constitutionality.",
            keyPoints: [
              "Three organs of government - Executive, Legislature, Judiciary with separation of powers",
              "Parliament consists of Lok Sabha (543 members) and Rajya Sabha (245 members)",
              "Prime Minister and Council of Ministers form the real executive power",
              "President is constitutional head, elected by Electoral College",
              "Supreme Court is highest judicial authority with power of judicial review",
              "Lok Sabha members directly elected for 5-year terms",
              "Rajya Sabha members elected by state legislatures for 6-year terms",
              "Cabinet system with collective responsibility to Parliament",
              "Parliamentary sovereignty with Constitution as supreme law",
              "Attorney General as chief legal advisor to government",
              "Comptroller and Auditor General audits government accounts",
              "Election Commission conducts free and fair elections",
            ],
            summary:
              "The chapter describes the structure and functions of India's Central Government, explaining the roles of different institutions and the principle of separation of powers.",
            importantDates: [
              "1950 - First President Dr. Rajendra Prasad took office",
              "1952 - First Lok Sabha elections held",
              "1950 - Supreme Court established",
            ],
            keyFigures: [
              "Dr. Rajendra Prasad - First President of India",
              "Jawaharlal Nehru - First Prime Minister",
              "Justice H.J. Kania - First Chief Justice of India",
            ],
            concepts: [
              "Separation of Powers - Division of government into three branches",
              "Parliamentary System - Executive responsible to legislature",
              "Judicial Review - Court's power to examine law's validity",
              "Electoral College - Body that elects the President",
              "Collective Responsibility - Cabinet's joint accountability to Parliament",
            ],
          },
          {
            id: "civ-3",
            title: "State Government",
            unit: "Civics",
            chapter: "Chapter 3",
            pageReference: "Pages 301-315",
            content:
              "State governments in India have significant powers and responsibilities in governance, following a similar structure to the Central Government. The Governor is the constitutional head while the Chief Minister is the executive head. State legislature can be unicameral (Legislative Assembly only) or bicameral (Legislative Assembly and Legislative Council). High Courts are the highest judicial authority in states. The 73rd and 74th Constitutional Amendments strengthened local governance through Panchayati Raj institutions in rural areas and municipalities in urban areas.",
            keyPoints: [
              "Governor is constitutional head appointed by President for 5-year term",
              "Chief Minister is executive head, leader of majority party in assembly",
              "State legislature - unicameral (Assembly) or bicameral (Assembly + Council)",
              "High Courts are highest state judicial authority with original and appellate jurisdiction",
              "Centre-State relations governed by constitutional provisions and cooperative federalism",
              "State List contains 61 subjects under state government jurisdiction",
              "Concurrent List has 52 subjects where both center and state can legislate",
              "Governor's role includes assenting to bills and appointing Chief Minister",
              "State Public Service Commission conducts recruitment for state services",
              "Advocate General is chief legal advisor to state government",
              "State Election Commission conducts local body elections",
              "Emergency provisions allow central intervention in state affairs",
            ],
            summary:
              "This chapter examines the structure and functioning of state governments in India, their powers, and relationship with the central government.",
            importantDates: [
              "1956 - States Reorganization Act created linguistic states",
              "1992 - 73rd Amendment for Panchayati Raj",
              "1992 - 74th Amendment for urban local bodies",
            ],
            keyFigures: [
              "Fazal Ali - Chairman of States Reorganization Commission",
              "K.M. Panikkar - Member of States Reorganization Commission",
            ],
            concepts: [
              "Federalism - Division of powers between center and states",
              "Governor - Constitutional head of state government",
              "Unicameral - Single house legislature",
              "Bicameral - Two house legislature",
              "Cooperative Federalism - Center and states working together",
            ],
          },
          {
            id: "civ-4",
            title: "Local Self Government",
            unit: "Civics",
            chapter: "Chapter 4",
            pageReference: "Pages 316-330",
            content:
              "Local self-government institutions play a crucial role in grassroots democracy and development in India. The 73rd Constitutional Amendment (1992) gave constitutional status to Panchayati Raj institutions, while the 74th Amendment (1992) did the same for urban local bodies. The three-tier Panchayati Raj system includes Gram Panchayat at village level, Panchayat Samiti at block level, and Zilla Panchayat at district level. Urban local bodies include Municipal Corporations, Municipal Councils, and Nagar Panchayats. These institutions have been empowered with functions, funds, and functionaries to ensure effective local governance.",
            keyPoints: [
              "Panchayati Raj system has three tiers - Gram, Block, and District levels",
              "Urban local bodies - Municipal Corporations, Councils, and Nagar Panchayats",
              "73rd Constitutional Amendment (1992) gave constitutional status to Panchayats",
              "74th Constitutional Amendment (1992) empowered urban local bodies",
              "Functions include development planning, implementation of schemes, and service delivery",
              "Women's participation ensured through 33% reservation in all positions",
              "SC/ST reservation as per their population proportion",
              "State Election Commissions conduct elections every 5 years",
              "Finance Commission recommends fund allocation to local bodies",
              "Gram Sabha is foundation of Panchayati Raj system",
              "Ward committees in urban areas ensure citizen participation",
              "MGNREGA implementation through Gram Panchayats",
            ],
            summary:
              "The chapter discusses local governance institutions and their importance in democracy, highlighting the constitutional amendments that strengthened grassroots democracy.",
            importantDates: [
              "1992 - 73rd Amendment Act passed",
              "1992 - 74th Amendment Act passed",
              "1993 - Amendments came into effect",
            ],
            keyFigures: [
              "Balwant Rai Mehta - Chairman of committee recommending Panchayati Raj",
              "Ashok Mehta - Chairman of committee on Panchayati Raj institutions",
            ],
            concepts: [
              "Panchayati Raj - Three-tier local government system",
              "Gram Sabha - Village assembly of all adult members",
              "Decentralization - Transfer of power to local levels",
              "Grassroots Democracy - Democracy at village/local level",
              "Local Self-Government - Governance by local people for local issues",
            ],
          },
          {
            id: "civ-5",
            title: "India's Foreign Policy",
            unit: "Civics",
            chapter: "Chapter 5",
            pageReference: "Pages 331-345",
            content:
              "India's foreign policy is based on principles of non-alignment, peaceful coexistence, and mutual cooperation with all nations. The policy aims to protect national interests while promoting world peace and supporting developing countries. India follows Panchsheel principles in international relations and maintains strategic partnerships with major powers while supporting multilateralism. The country plays an active role in international organizations like the United Nations, BRICS, G20, and regional groupings like SAARC and ASEAN Plus.",
            keyPoints: [
              "Principles of Indian foreign policy - non-alignment, peaceful coexistence, mutual respect",
              "Panchsheel (Five Principles) - mutual respect, non-aggression, non-interference, equality, peaceful coexistence",
              "Non-Aligned Movement leadership during Cold War period",
              "Relations with neighboring countries - complex relationships with Pakistan and China",
              "Role in international organizations - UN, BRICS, G20, SAARC, ASEAN Plus",
              "Strategic partnerships with USA, Russia, European Union, Japan",
              "Support for developing countries and South-South cooperation",
              "Nuclear policy - No First Use doctrine and disarmament advocacy",
              "Economic diplomacy focusing on trade, investment, and technology",
              "Diaspora diplomacy leveraging overseas Indian community",
              "Climate change leadership and renewable energy cooperation",
              "Counter-terrorism cooperation and maritime security initiatives",
            ],
            summary:
              "This chapter explores India's foreign policy principles and international relations, highlighting the country's role in global affairs and regional cooperation.",
            importantDates: [
              "1947 - Independent India's foreign policy begins",
              "1954 - Panchsheel Agreement with China",
              "1961 - Non-Aligned Movement founded",
              "1998 - Nuclear tests conducted",
              "2005 - India-US Nuclear Deal",
            ],
            keyFigures: [
              "Jawaharlal Nehru - Architect of India's foreign policy",
              "V.K. Krishna Menon - Prominent diplomat",
              "Atal Bihari Vajpayee - PM during nuclear tests",
              "Dr. A.P.J. Abdul Kalam - Advocate of peaceful nuclear program",
            ],
            concepts: [
              "Non-Alignment - Policy of not joining military alliances",
              "Panchsheel - Five principles of peaceful coexistence",
              "Strategic Partnership - Long-term cooperation agreement",
              "Multilateralism - Cooperation among multiple countries",
              "Diaspora Diplomacy - Using overseas communities for foreign policy",
            ],
          },
        ],
      },
      economics: {
        name: "Economics",
        lessons: [
          {
            id: "eco-1",
            title: "Development and Its Measurement",
            unit: "Economics",
            chapter: "Chapter 1",
            pageReference: "Pages 346-360",
            content:
              "Development is a multidimensional concept that goes beyond economic growth to include social and human development indicators. It encompasses improvements in living standards, education, healthcare, and quality of life. Various indicators are used to measure development including GDP, per capita income, Human Development Index (HDI), literacy rate, and life expectancy. Sustainable development goals emphasize the need for development that meets present needs without compromising future generations. Challenges in measuring development include regional disparities, income inequality, and environmental degradation.",
            keyPoints: [
              "Concept of development vs economic growth - qualitative vs quantitative improvement",
              "Indicators of development - GDP, per capita income, HDI, literacy rate, life expectancy",
              "Human Development Index combines income, education, and health indicators",
              "Sustainable development goals (SDGs) for comprehensive development",
              "Challenges in measuring development - inequality, environmental costs, quality of life",
              "Quality of life includes access to basic services, healthcare, education",
              "Gender Development Index measures gender equality in development",
              "Multidimensional Poverty Index considers various deprivations",
              "Green GDP accounts for environmental degradation costs",
              "Gross National Happiness as alternative development measure",
              "Regional disparities in development within countries",
              "Role of technology and innovation in development process",
            ],
            summary:
              "The chapter explains the concept of development and various methods to measure it, emphasizing that true development goes beyond economic indicators to include human welfare and sustainability.",
            importantDates: [
              "1990 - First Human Development Report published",
              "2000 - Millennium Development Goals adopted",
              "2015 - Sustainable Development Goals adopted",
            ],
            keyFigures: [
              "Mahbub ul Haq - Creator of Human Development Index",
              "Amartya Sen - Nobel laureate, development economist",
              "Joseph Stiglitz - Economist advocating beyond GDP measures",
            ],
            concepts: [
              "Development - Improvement in quality of life and living standards",
              "Human Development Index - Composite measure of development",
              "Sustainable Development - Development without environmental harm",
              "Per Capita Income - Average income per person",
              "Quality of Life - Overall well-being of individuals and communities",
            ],
          },
          {
            id: "eco-2",
            title: "Globalization and Trade",
            unit: "Economics",
            chapter: "Chapter 2",
            pageReference: "Pages 361-375",
            content:
              "Globalization has integrated world economies through trade, investment, and technology transfer, creating both opportunities and challenges. It involves the free movement of goods, services, capital, and ideas across borders. International trade allows countries to specialize in production and benefit from comparative advantage. Multinational corporations play a crucial role in global economic integration. However, globalization can lead to job losses in some sectors, increased inequality, and cultural homogenization. Trade policies and agreements like WTO rules govern international commerce.",
            keyPoints: [
              "Meaning and features of globalization - integration of world economies",
              "International trade benefits - specialization, comparative advantage, larger markets",
              "Multinational corporations (MNCs) and their role in global economy",
              "Impact of globalization on developing countries - opportunities and challenges",
              "Trade policies and agreements - WTO, bilateral and multilateral agreements",
              "Foreign Direct Investment (FDI) and technology transfer",
              "Global value chains and production networks",
              "Cultural globalization and its effects on local traditions",
              "Digital globalization through internet and e-commerce",
              "Environmental challenges of increased global trade",
              "Labor migration and brain drain/gain phenomena",
              "Financial globalization and capital flows",
            ],
            summary:
              "This chapter examines globalization, international trade, and their effects on economies, highlighting both benefits and challenges of economic integration.",
            importantDates: [
              "1995 - World Trade Organization established",
              "1991 - India's economic liberalization begins",
              "2001 - China joins WTO",
            ],
            keyFigures: [
              "Adam Smith - Theory of absolute advantage",
              "David Ricardo - Theory of comparative advantage",
              "Dr. Manmohan Singh - Architect of India's economic reforms",
            ],
            concepts: [
              "Globalization - Integration of world economies",
              "Comparative Advantage - Ability to produce at lower opportunity cost",
              "Multinational Corporation - Company operating in multiple countries",
              "Free Trade - Trade without government restrictions",
              "Foreign Direct Investment - Investment in foreign countries",
            ],
          },
          {
            id: "eco-3",
            title: "Food Security",
            unit: "Economics",
            chapter: "Chapter 3",
            pageReference: "Pages 376-390",
            content:
              "Food security ensures that all people have access to sufficient, safe, and nutritious food to maintain a healthy life. It has four dimensions: availability, accessibility, utilization, and stability. India faces challenges of hunger, malnutrition, and food wastage despite being a major food producer. The Public Distribution System (PDS) provides subsidized food grains to poor families. Various government schemes like Mid-Day Meal Program and Integrated Child Development Services address nutritional needs. Food security is closely linked to poverty, employment, and agricultural productivity.",
            keyPoints: [
              "Four dimensions of food security - availability, accessibility, utilization, stability",
              "Public Distribution System (PDS) provides subsidized food grains to poor families",
              "Food production vs food security - India produces enough but distribution issues persist",
              "Nutritional security and malnutrition - protein, vitamin, and mineral deficiencies",
              "Government schemes - Mid-Day Meal, ICDS, Antyodaya Anna Yojana",
              "Food wastage and post-harvest losses in storage and transportation",
              "Buffer stock management by Food Corporation of India",
              "Minimum Support Price (MSP) for farmers' income security",
              "National Food Security Act 2013 - legal right to food",
              "Organic farming and food safety concerns",
              "Climate change impacts on food production and security",
              "International cooperation on food security and hunger elimination",
            ],
            summary:
              "The chapter discusses food security, its importance, and measures to ensure it, highlighting the challenges of hunger and malnutrition despite adequate food production.",
            importantDates: [
              "1965 - Food Corporation of India established",
              "1975 - Public Distribution System launched",
              "2013 - National Food Security Act passed",
            ],
            keyFigures: [
              "Dr. M.S. Swaminathan - Food security expert",
              "Dr. Verghese Kurien - White Revolution leader",
              "C. Subramaniam - Architect of Green Revolution policies",
            ],
            concepts: [
              "Food Security - Access to sufficient, safe, nutritious food",
              "Public Distribution System - Government food distribution network",
              "Malnutrition - Inadequate or unbalanced nutrition",
              "Buffer Stock - Government food grain reserves",
              "Minimum Support Price - Guaranteed price for farmers",
            ],
          },
          {
            id: "eco-4",
            title: "Employment",
            unit: "Economics",
            chapter: "Chapter 4",
            pageReference: "Pages 391-405",
            content:
              "Employment is crucial for economic development and individual welfare. India faces challenges in providing adequate employment opportunities for its growing population. The economy has both organized (formal) and unorganized (informal) sectors, with the majority working in the informal sector. Unemployment exists in various forms including disguised unemployment in agriculture. Government initiatives focus on skill development, entrepreneurship promotion, and employment generation through various schemes. The changing nature of work due to technology and globalization requires new approaches to employment policy.",
            keyPoints: [
              "Types of employment - organized (formal) sector vs unorganized (informal) sector",
              "Unemployment types - open, disguised, seasonal, structural, cyclical unemployment",
              "Employment generation schemes - MGNREGA, PMKVY, Startup India, Make in India",
              "Skill development and vocational training for employability enhancement",
              "Role of education in employment - matching skills with job requirements",
              "Self-employment and entrepreneurship promotion through government schemes",
              "Women's participation in workforce and gender equality in employment",
              "Rural employment challenges and agricultural labor issues",
              "Urban employment in services and manufacturing sectors",
              "Technology impact on employment - automation and job displacement",
              "Gig economy and changing nature of work",
              "Social security for workers in organized and unorganized sectors",
            ],
            summary:
              "This chapter analyzes employment patterns, unemployment issues, and government initiatives to promote job creation and skill development in India.",
            importantDates: [
              "2005 - MGNREGA launched",
              "2015 - Skill India Mission launched",
              "2016 - Startup India initiative launched",
            ],
            keyFigures: [
              "Dr. A.P.J. Abdul Kalam - Advocate of skill development",
              "Aruna Roy - MGNREGA activist",
              "Ela Bhatt - Founder of SEWA (Self Employed Women's Association)",
            ],
            concepts: [
              "Employment - Engagement in work for wages or salary",
              "Unemployment - Situation where people seeking work cannot find jobs",
              "Organized Sector - Formal employment with job security and benefits",
              "Unorganized Sector - Informal employment without job security",
              "Skill Development - Training to improve work capabilities",
            ],
          },
          {
            id: "eco-5",
            title: "Economic Planning in India",
            unit: "Economics",
            chapter: "Chapter 5",
            pageReference: "Pages 406-420",
            content:
              "Economic planning in India has evolved from Five-Year Plans to NITI Aayog, focusing on balanced development and poverty reduction. The Planning Commission was established in 1950 to formulate five-year plans for economic development. These plans aimed at achieving self-reliance, reducing poverty, and promoting industrialization. The approach shifted from centralized planning to indicative planning with market-friendly policies. NITI Aayog replaced the Planning Commission in 2015 to provide strategic and technical advice to the government. Current policies emphasize sustainable development, digital India, and inclusive growth.",
            keyPoints: [
              "Evolution of economic planning from Five-Year Plans to NITI Aayog approach",
              "Planning Commission (1950-2014) formulated twelve Five-Year Plans",
              "Objectives - economic growth, poverty reduction, employment generation, self-reliance",
              "NITI Aayog (2015) replaced Planning Commission for policy think tank role",
              "Achievements - industrial development, agricultural growth, infrastructure creation",
              "Failures - slow poverty reduction, regional imbalances, bureaucratic inefficiencies",
              "Shift from centralized to indicative planning with market mechanisms",
              "Current economic policies - Digital India, Make in India, Atmanirbhar Bharat",
              "Sustainable Development Goals integration in planning process",
              "Public-private partnerships in development projects",
              "Cooperative federalism and state participation in planning",
              "Monitoring and evaluation mechanisms for plan implementation",
            ],
            summary:
              "The chapter traces the evolution of economic planning in India and its outcomes, from centralized five-year plans to the current policy framework under NITI Aayog.",
            importantDates: [
              "1950 - Planning Commission established",
              "1951 - First Five-Year Plan launched",
              "2015 - NITI Aayog replaces Planning Commission",
              "2017 - SDGs adopted in planning process",
            ],
            keyFigures: [
              "Jawaharlal Nehru - Advocate of planned development",
              "P.C. Mahalanobis - Architect of Second Five-Year Plan",
              "Dr. Manmohan Singh - Economic reforms architect",
              "Arvind Panagariya - First Vice-Chairman of NITI Aayog",
            ],
            concepts: [
              "Economic Planning - Government direction of economic development",
              "Five-Year Plans - Medium-term development planning",
              "Mixed Economy - Combination of public and private sectors",
              "Indicative Planning - Government guidance rather than control",
              "Sustainable Development - Development meeting present and future needs",
            ],
          },
        ],
      },
    },
  },
}

export const getSubjectData = (subject: string) => {
  return textbookData[subject] || null
}

export const getUnitData = (subject: string, unit: string) => {
  const subjectData = textbookData[subject]
  return subjectData?.units[unit] || null
}

export const getLessonData = (subject: string, unit: string, lessonId: string) => {
  const unitData = getUnitData(subject, unit)
  return unitData?.lessons.find((lesson) => lesson.id === lessonId) || null
}

export const searchLessons = (query: string, subject?: string) => {
  const results: LessonContent[] = []
  const searchTerm = query.toLowerCase()

  const subjectsToSearch = subject ? [subject] : Object.keys(textbookData)

  subjectsToSearch.forEach((subjectKey) => {
    const subjectData = textbookData[subjectKey]
    if (subjectData) {
      Object.values(subjectData.units).forEach((unit) => {
        unit.lessons.forEach((lesson) => {
          if (
            lesson.title.toLowerCase().includes(searchTerm) ||
            lesson.content.toLowerCase().includes(searchTerm) ||
            lesson.keyPoints.some((point) => point.toLowerCase().includes(searchTerm))
          ) {
            results.push(lesson)
          }
        })
      })
    }
  })

  return results
}
