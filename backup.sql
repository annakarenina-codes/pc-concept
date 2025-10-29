--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO postgres;

--
-- Name: blogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blogs (
    blog_id integer NOT NULL,
    title character varying(255) NOT NULL,
    introduction text NOT NULL,
    body text NOT NULL,
    conclusion text NOT NULL,
    image_url character varying(255),
    author character varying(100) NOT NULL,
    date_published date NOT NULL
);


ALTER TABLE public.blogs OWNER TO postgres;

--
-- Name: blogs_blog_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blogs_blog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.blogs_blog_id_seq OWNER TO postgres;

--
-- Name: blogs_blog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.blogs_blog_id_seq OWNED BY public.blogs.blog_id;


--
-- Name: product_specifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_specifications (
    spec_id integer NOT NULL,
    product_id character varying(10) NOT NULL,
    spec_name character varying(100) NOT NULL,
    spec_value character varying(255) NOT NULL
);


ALTER TABLE public.product_specifications OWNER TO postgres;

--
-- Name: product_specifications_spec_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_specifications_spec_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_specifications_spec_id_seq OWNER TO postgres;

--
-- Name: product_specifications_spec_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_specifications_spec_id_seq OWNED BY public.product_specifications.spec_id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    product_id character varying(10) NOT NULL,
    name character varying(100) NOT NULL,
    brand character varying(50),
    category character varying(50) NOT NULL,
    subcategory character varying(50),
    price numeric(10,2) NOT NULL,
    image_url character varying(255) NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    product_id character varying(10) NOT NULL,
    user_alias character varying(50) NOT NULL,
    review_text text NOT NULL,
    category character varying(50) NOT NULL,
    subcategory character varying(50),
    brand character varying(50),
    date_posted timestamp without time zone NOT NULL
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_review_id_seq OWNER TO postgres;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;


--
-- Name: blogs blog_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs ALTER COLUMN blog_id SET DEFAULT nextval('public.blogs_blog_id_seq'::regclass);


--
-- Name: product_specifications spec_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_specifications ALTER COLUMN spec_id SET DEFAULT nextval('public.product_specifications_spec_id_seq'::regclass);


--
-- Name: reviews review_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alembic_version (version_num) FROM stdin;
9cf998d2d9bc
\.


--
-- Data for Name: blogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blogs (blog_id, title, introduction, body, conclusion, image_url, author, date_published) FROM stdin;
1	Beginner's Guide To Building Your First PC	The journey to building your first PC is an exciting one, opening doors to customizability, enhanced performance, and a deeper understanding of the technology you use daily. Many prospective builders are deterred by the sheer number of components and the perceived complexity of the process. However, with a methodical approach and reliable guidance, anyone can successfully assemble their own machine. The first crucial step is to define your PC's primary purpose. 	Once your purpose and budget are clear, it's time to delve into the core components. The Central Processing Unit (CPU) is the brain of your computer, responsible for executing instructions and managing processes. Intel and AMD are the two major players, each offering a range of processors suited for different budgets and performance needs. Researching current-generation CPUs and their benchmarks is essential. Next comes the Motherboard, which acts as the nervous system, connecting all the components. 	Many online tutorials and manuals offer step-by-step visual guides, which are invaluable for first-time builders. Remember to take your time, apply gentle but firm pressure when seating components, and consult your manuals often. Building your own PC is not just about saving money; it's about the satisfaction of creating a machine tailored precisely to your needs, and gaining a valuable skill along the way.	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761356490/1_hvaqsu.jpg	Alex "TechWiz" Rivera	2025-08-28
2	Top 3 Budget Laptops For Students In 2025	Looking for a laptop that fits your budget pero kaya pa rin ang schoolwork and entertainment? We've rounded up the best laptops under ₱30,000 that deliver solid performance for studying, browsing, and even light gaming. From trusted brands like ASUS, Lenovo, and Acer – here are our top picks this year.	Our first pick is the ASUS VivoBook 15 (2025 Edition). Priced at approximately ₱28,500, this laptop consistently impresses with its AMD Ryzen 5 processor, offering snappy performance for multitasking. Next up, we have the Lenovo IdeaPad Flex 3 (2025), a versatile 2-in-1 convertible laptop, often found around ₱29,000. What sets the Flex 3 apart is its adaptability. With a 360-degree hinge, it can transform from a traditional laptop to a tablet, tent, or stand mode, making it ideal for note-taking. The Acer Aspire 5 (2025 Refresh) secures its spot due to its consistent value for money, usually retailing for about ₱27,000. Acer has packed this machine with impressive specs for its price point, often featuring a newer generation Intel Core i5 or AMD Ryzen 5	These laptops demonstrate that a tight budget doesn't mean sacrificing quality or functionality. Each offers a unique blend of features catering to different student needs, proving that a powerful and reliable academic companion is well within reach in 2025.	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761356448/2_ddergx.jpg	Maya "GadgetGal" Santos	2025-01-05
3	SSD Vs HDD: Ano Ang Mas Magandang Storage Para Sayo?	Storage plays a big role in your computer's speed and performance. Pero alin ba talaga ang mas sulit – SSD o HDD? In this post, we'll compare speed, durability, capacity, and price, so you'll know exactly which one is the better choice for your needs.	Let's start with the traditional Hard Disk Drive (HDD). HDDs have been the standard storage solution for decades, relying on spinning platters and read/write heads to access data electromagnetically. The main advantage of HDDs is their cost-effectiveness per gigabyte. On the other hand, Solid State Drives (SSDs) represent a significant leap in storage technology. Instead of spinning platters, SSDs use flash memory (similar to a USB stick or memory card) to store data. Because there are no moving parts, SSDs are dramatically faster than HDDs.	So, which is right for you? For most modern PC builds or upgrades, the recommended approach is a hybrid setup. Install a smaller capacity SSD (250GB to 500GB) for your operating system (Windows or macOS), frequently used applications, and perhaps a few favorite games. This will provide you with the blazing fast boot times and application responsiveness that SSDs are known for.	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761356451/3_yhlreo.jpg	Gabriel "DataGuy" Cruz	2025-08-28
4	5 Tips To Keep Your Gaming PC In Top Shape	Gaming rigs are investments, and proper care can make them last longer. From regular cleaning and checking temps, hanggang sa updating drivers, we'll give you practical tips on how to maintain your gaming PC so it performs like new even after years of use.	The number one enemy of any computer is dust. Dust acts as an insulating blanket, trapping heat inside your case and forcing your fans to work harder, which generates more noise and accelerates wear and tear. Closely tied to dust control is temperature monitoring. High operating temperatures are the primary cause of hardware degradation and instability. Maintaining the software ecosystem is equally important. Your computer's performance relies on drivers—the software that allows your operating system to communicate effectively with your hardware. A sluggish PC isn't always a hardware problem; often, the blame lies with a cluttered, disorganized, or over-burdened operating system (OS). The Power Supply Unit (PSU) is the heart of your PC. A cheap, unreliable PSU can not only fail prematurely but can also send unstable or incorrect voltage to your components	By committing to these five simple maintenance steps—cleaning the dust, watching the heat, updating the software, keeping the OS tidy, and protecting your power—you are actively extending the life and maximizing the performance of your gaming rig. Happy gaming!	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761356444/4_r4lxyv.jpg	Chloe "PCPro" Lim	2025-03-08
5	Common PC Building Mistakes And How To Avoid Them	Content Continuation: Building a PC is exciting, but small mistakes can lead to frustrating problems. From forgetting motherboard standoffs to mismatched power supply cables, this guide lists the most common errors beginners make and how to avoid them. Follow these tips to save time, money, and stress when assembling your system.	Before mounting the motherboard, check your case and the motherboard's manual. Ensure you install standoffs in all the locations that correspond to the mounting holes on your motherboard. If your case has pre-installed standoffs, confirm they align perfectly. If you skip this step, the moment you power on your rig, you risk frying your entire system. Always install the standoffs! Plan your cable routing. Utilize the cable management holes, tie-down points, and Velcro straps (or zip ties) provided by your case. This small effort drastically improves cooling efficiency and makes future maintenance easier.	Building your own PC is a rewarding experience, but navigating the process without a guide can turn excitement into frustration. As we've detailed, the difference between a seamless build and a headache often comes down to attention to detail: checking for motherboard standoffs to prevent short circuits, ensuring tidy cable management for optimal airflow and cooling, and correctly seating and placing RAM sticks	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761356492/5_n9dr40.png	TechWiz	2025-05-14
6	Top 3 Must-Have PC Accessories For 2025	Ergonomic Mechanical Keyboard: Don't settle for mushy keys. A high-quality mechanical keyboard with proper wrist support is crucial for comfort and speed. High-Refresh Rate Gaming Mouse: Precision is paramount in 2025. Upgrade to a mouse with a high DPI sensor and a polling rate of at least 1000Hz.	XL Desk/Mouse Mat: The days of the small, restrictive mouse pad are over. An extended mat provides a vast, uniform, low-friction surface area for both your keyboard and mouse, preventing slips and protecting your desk. This simple accessory cleans up your workspace aesthetics and ensures smooth tracking for large, sweeping mouse movements.	Don't treat these items as mere optional extras. The right accessories are productivity multipliers and comfort enhancers that directly impact your daily interaction with your machine. By investing in these five peripherals, you will not only maximize your powerful PC investment but also ensure your entire setup is optimized for both peak performance and long-term usability in 2025.	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761356498/6_hfysvo.jpg	Gadget Guru	2025-06-19
7	Back To School Promo! Class-Ready, Game Ready!	The new school year is here! Gear up with top-performing laptops and desktops designed for students and gamers alike.	Check out the versatile Acer Aspire Lite 15 for study sessions, or the Lenovo IdeaPad 3 Slim 3 for effortless multitasking. For gamers, the Asus Vivobook Gaming X16 delivers smooth performance. Each device combines quality, reliability, and great value—ideal for both class and play.	Step into a successful school year with a device matched to your goals, available now at PC Concept.	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761402840/7_s7paam.jpg	PC Concept	2025-06-24
8	MID-YEAR SALE MADNESS Is Here!	It’s that time of year—mid-year savings frenzy is live. Tech upgrades are only a deal away!	Find discounts on the Asus Vivobook Go 15 and Lenovo LOQ Gaming 15IAX9E, plus accessories like the Redragon Lamia 2 headset. Go further for less, whether you’re working, learning, or gaming.	Take advantage of these special offers while stocks last, only at PC Concept.	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761402840/8_ee9xnu.jpg	PC Concept	2025-07-21
9	JBL Partybox Speakers, BELOW SRP!	Ready to amplify your next event? It’s time to party with JBL's legendary Partybox series.	Grab the JBL Partybox 710 or the compact JBL Partybox Encore with deep bass and vivid lights. Exceptional audio quality brings every gathering to life, indoors or out.	Celebrate with style—enjoy unbeatable savings on JBL speakers today at PC Concept.	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761402840/9_wsrvel.jpg	PC Concept	2025-09-05
10	Don’t Miss Out! Blowout Sale Is On!	Unprecedented discounts are here! Our Blowout Sale cuts prices across must-have hardware.	Explore powerful desktops like AMD Ryzen 7 5700G or Intel Core i5 12400 bundles. Gamers and professionals alike can benefit from deals on Sapphire Pure RX 9060XT graphics cards.	Hurry! These offers won’t last long—visit or shop online at PC Concept now.	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761402840/10_swyeln.jpg	PC Concept	2025-08-24
11	EXTENDED PROMO Standard Desktop Set	Upgrade your home or office setup with exclusive savings on our standard desktop sets.	Choose the AMD Ryzen 5 5600G PC bundle or Intel Core i3 12100 for reliable daily performance. Each set includes premium components engineered for productivity and stability.	Seize this extended offer to boost your workspace—only at PC Concept.	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761402843/11_zups5f.jpg	PC Concept	2025-06-06
\.


--
-- Data for Name: product_specifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_specifications (spec_id, product_id, spec_name, spec_value) FROM stdin;
1	L001	Operating System	Windows 11 Home
2	L001	Processor & Chipset	Intel® Core i5-13420H
3	L001	Memory	16GB of DDR5 system memory, upgradable to 32 GB using two soDIMM modules 2 (1) 5200Mhz DDR5
4	L001	Storage	512GB NVMe SSD 2 (1)
5	L001	Display	15.6inch display with IPS (In-Plane Switching) technology, Full HD 1920 x 1080, Acer ComfyView LED-backlit TFT LCD
6	L001	Graphics	NVIDIA® GeForce RTX 4050 with 6 GB of dedicated GDDR6 VRAM,supporting 2560 NVIDIA® CUDA® Cores
7	L001	Audio	DTS® X:Ultra Audio, featuring optimized Bass, Loudness, Speaker Protection with up to 6 custom content modes by smart amplifier
8	L001	Battery Information	2.113 kg (4.66 lbs.) with 4-cell battery pack
9	L001	Power Description	362.3 (W) x 239.89 (D) x 23.5/27 (H) mm (14.26 x 9.44 x 0.93/1.06 inches)
10	L002	Operating System	Windows 11 Home
11	L002	Processor & Chipset	Intel® Core™ i5-13500H
12	L002	Memory	16GB DDR4 (3200MHz)
13	L002	Storage	512GB M.2 NVMe PCIe SSD
14	L002	Display	15.6" FHD (1920x1080) IPS/WUXGA
15	L002	Graphics	Intel® UHD Graphics
16	L002	Audio	Speakers: 2 Built-in Speakers. Microphone: Built-in Microphone.
17	L002	Battery Information	Max Battery Run Time: Up to 10 Hours.
18	L002	Power Description	Max Power Supply Wattage: 45 W.
19	L003	Operating System	Windows 11 Home
20	L003	Processor & Chipset	Intel® Core™ i5-12450H
21	L003	Memory	8GB DDR4 (3200MHz, Upgradable to 32GB)
22	L003	Storage	512GB NVMe SSD
23	L003	Display	15.6" FHD (1920x1080) IPS 144Hz
24	L003	Graphics	NVIDIA® GeForce® GTX 1650 4GB GDDR6
25	L003	Audio	Speakers: 2 Built-in Speakers (Stereo). Microphone: Built-in Microphone.
26	L003	Battery Information	Number of Cells: 3-cell Lithium Ion (Li-Ion). Battery Energy: 50 Wh. Maximum Battery Run Time: 5.50 Hours.
27	L003	Power Description	Maximum Power Supply Wattage: 135 W.
28	L004	Operating System	Windows 11 Home
29	L004	Processor & Chipset	AMD Ryzen 5 7535HS
30	L004	Memory	8GB DDR5 RAM (Upgradable)
31	L004	Storage	512GB NVMe SSD
32	L004	Display	15.6" FHD (1920x1080) IPS with a 165Hz refresh rate.
33	L004	Graphics	Dedicated NVIDIA GeForce RTX 2050 4GB GDDR6 (supports Ray Tracing).
34	L004	Audio	DTS:X Ultra Audio, Acer TrueHarmony, Acer Purified.Voice technology (with AI noise reduction in dual built-in microphones)
35	L004	Battery Information	4-cell Lithium Ion (Li-Ion). Up to 7 hours (based on video playback test results).
36	L004	Power Description	3-pin 135 W AC adapter.
37	L005	Operating System	Windows 11 Home
38	L005	Processor & Chipset	AMD Ryzen™ 7 5700U
39	L005	Memory	8GB DDR4 RAM
40	L005	Storage	512GB NVMe SSD
41	L005	Display	15.6" FHD (1920x1080)
42	L005	Graphics	AMD Radeon™ Graphics
43	L005	Audio	Built-in Microphone.
44	L005	Battery Information	Max Battery Run Time: Up to 10 Hours. Battery: 4 Cell 58Wh
45	L005	Power Description	45W power adapter
46	L006	Operating System	Windows 11 Home
47	L006	Processor & Chipset	AMD Ryzen™ 3 7320U Processor (2.4GHz, up to 4.1GHz, 4 cores, 8 Threads)
48	L006	Memory	8GB LPDDR5 on board
49	L006	Storage	512GB M.2 NVMe™ PCIe® 3.0 SSD
50	L006	Display	15.6-inch, FHD (1920 x 1080) 16:9 aspect ratio, LED Backlit, 60Hz, Anti-glare
51	L006	Graphics	AMD Radeon™ Graphics (Integrated/Shared)
52	L006	Audio	SonicMaster, Built-in speaker, Built-in array microphone, with Cortana voice-recognition support
53	L006	Battery Information	42WHrs, 3S1P, 3-cell Li-ion
54	L006	Power Description	45W AC Adapter, Output: 19V DC, 2.37A, 45W
55	L007	Operating System	Windows 11 Home
56	L007	Processor & Chipset	Intel® Core™ i5-13420H Processor (2.1 GHz, up to 4.6 GHz, 8 cores, 12 Threads)
57	L007	Memory	8GB DDR4 RAM (Expandable with SO-DIMM slot)
58	L007	Storage	512GB M.2 NVMe™ PCIe® 4.0 SSD
59	L007	Display	16-inch WUXGA (1920 x 1200) 16:10 aspect ratio, IPS-level Panel, 144Hz refresh rate, Anti-glare
60	L007	Graphics	NVIDIA® GeForce RTX™ 3050 4GB Laptop GPU (GDDR6)
61	L007	Audio	SonicMaster, Built-in speaker, Built-in array microphone, with Cortana support
62	L007	Battery Information	50WHrs, 3S1P, 3-cell Li-ion
63	L007	Power Description	120W AC Adapter, Output: 20V DC, 6A, 120W
64	L008	Operating System	Windows 11 Home
65	L008	Processor & Chipset	Intel® Core™ i3-N305 Processor (1.8 GHz, up to 3.8 GHz, 8 cores, 8 Threads)
66	L008	Memory	8GB DDR4 on board
67	L008	Storage	512GB M.2 NVMe™ PCIe® 3.0 SSD
68	L008	Display	14.0-inch, FHD (1920 x 1080) 16:9 aspect ratio, LED Backlit, 60Hz, Anti-glare
69	L008	Graphics	Intel® UHD Graphics (Integrated/Shared)
70	L008	Audio	Built-in speaker, Built-in array microphone, with Cortana voice-recognition support
71	L008	Battery Information	42WHrs, 3S1P, 3-cell Li-ion
72	L008	Power Description	45W AC Adapter, Output: 19V DC, 2.37A, 45W
73	L009	Operating System	Windows 11 Home
74	L009	Processor & Chipset	AMD Ryzen™ 7 7435HS Mobile Processor (3.1GHz, up to 4.5 GHz, 8 cores, 16 Threads)
75	L009	Memory	8GB DDR5-4800 SO-DIMM (Max Capacity: 32GB)
76	L009	Storage	512GB PCIe® 4.0 NVMe™ M.2 SSD
77	L009	Display	15.6-inch, FHD (1920 x 1080) 16:9, Value IPS-level, 144Hz, Anti-glare, Adaptive-Sync
78	L009	Graphics	NVIDIA® GeForce RTX™ 3050 Laptop GPU 4GB GDDR6 (Up to 1675MHz at 60W, 75W with Dynamic Boost)
79	L009	Audio	DTS Software, AI noise-canceling technology, Hi-Res certification, Built-in array microphone, 2-speaker system
80	L009	Battery Information	48WHrs, 3S1P, 3-cell Li-ion
81	L009	Power Description	180W AC Adapter, Output: 20V DC, 9A, 180W
82	L010	Operating System	Windows 11 Home
83	L010	Processor & Chipset	Intel® Celeron® N4500 Processor (1.1 GHz, up to 2.8 GHz, 2 cores)
84	L010	Memory	8GB DDR4 on board (Max Total system memory: 8GB)
85	L010	Storage	256GB M.2 NVMe™ PCIe® 3.0 SSD
86	L010	Display	15.6-inch, HD (1366 x 768) 16:9 aspect ratio, LED Backlit, 60Hz, Anti-glare
87	L010	Graphics	Intel® HD Graphics (Integrated/Shared)
88	L010	Audio	SonicMaster, Built-in speaker, Built-in microphone, with Cortana support
89	L010	Battery Information	42WHrs, 3S1P, 3-cell Li-ion
90	L010	Power Description	33W AC Adapter, Output: 19V DC, 1.75A, 33W
91	L011	Operating System	Windows 11 Home
92	L011	Processor & Chipset	Intel® Core™ i5-12450HX Processor (8 Cores, 12 Threads) / Intel® HM670 Chipset
93	L011	Memory	8GB DDR5-4800MHz (1x 8GB SO-DIMM, upgradeable up to 32GB)
94	L011	Storage	512GB SSD M.2 2242 PCIe® 4.0x4 NVMe® (Supports up to two M.2 SSDs)
95	L011	Display	15.6" FHD (1920x1080) IPS, 300 nits, Anti-glare, 100% sRGB, 144Hz
96	L011	Graphics	NVIDIA® GeForce RTX™ 3050 Laptop GPU 6GB GDDR6 (Boost Clock 1432MHz, TGP 65W)
97	L011	Audio	High Definition (HD) Audio, Realtek® ALC3287 codec, Stereo speakers (2W x2), optimized with Nahimic Audio
98	L011	Battery Information	Integrated 57Wh, supports Rapid Charge Pro (up to 50% in 30 minutes)
99	L011	Power Description	135W Slim Tip (3-pin) Power Adapter
100	L012	Operating System	Windows 11 Home
101	L012	Processor & Chipset	Intel® Core™ i5-13420H Processor (8 Cores, 12 Threads) / Intel® SoC Platform Chipset
102	L012	Memory	8GB Soldered DDR5-4800 (Max memory up to 24GB via one free SO-DIMM slot)
103	L012	Storage	512GB SSD M.2 2242 PCIe® 4.0x4 NVMe® (Supports up to two M.2 SSDs)
104	L012	Display	15.3" WUXGA (1920x1200) IPS, 300 nits, Anti-glare, 45% NTSC, 60Hz
105	L012	Graphics	Integrated Intel® UHD Graphics
106	L012	Audio	High Definition (HD) Audio, Stereo speakers (2W x2), optimized with Dolby Audio™
107	L012	Battery Information	Integrated 50Wh or 60Wh (Model 83K100CLPH often comes with 50Wh), supports Rapid Charge Boost
108	L012	Power Description	65W Round Tip (3-pin) Power Adapter
109	L013	Operating System	Windows 11 Home
110	L013	Processor & Chipset	Intel® Celeron® N4500 Processor (2 Cores, 2 Threads) / Intel® SoC Platform Chipset
111	L013	Memory	8GB SO-DIMM DDR4-2933 (Max memory is generally limited to 8GB depending on configuration)
112	L013	Storage	512GB SSD M.2 2242 PCIe® 4.0x4 NVMe® (M.2 2280 PCIe® 3.0 x4 slot)
113	L013	Display	15.6" HD (1366x768) TN, 220 nits, Anti-glare
114	L013	Graphics	Integrated Intel® UHD Graphics
115	L013	Audio	High Definition (HD) Audio, Stereo speakers (1.5W x2), Dolby Audio™
116	L013	Battery Information	Integrated 42Wh, supports Rapid Charge Boost
117	L013	Power Description	45W Round Tip (3-pin) Power Adapter
118	L014	Operating System	Windows 11 Home
119	L014	Processor & Chipset	AMD Ryzen™ 7 7000 Series (e.g., Ryzen 7 7735HS, Ryzen 5 7535U)
120	L014	Memory	Up to 64GB DDR5 4800MHz (Dual SODIMM slots, easily expandable)
121	L014	Storage	512GB M.2 2242 PCIe® 4.0x4 NVMe® SSD (One slot, supports up to 1TB)
122	L014	Display	16-inch, up to WQXGA (2560x1600), IPS, Anti-glare, 16:10 aspect ratio, up to 400 nits, 100% sRGB, TÜV Eyesafe® Certified (various options available, including WUXGA 1920x1200)
123	L014	Graphics	Integrated AMD Radeon™ Graphics (e.g., Radeon 680M or 660M)
124	L014	Audio	User-facing stereo speakers, 1.5W x2, optimized with Dolby Audio™, Dual-microphone array
125	L014	Battery Information	Integrated 47Wh
126	L014	Power Description	20V Output Voltage, 3.25A Output Current
127	L015	Operating System	Windows 11 Home
128	L015	Processor & Chipset	Intel Core i3-1315U (6Cores 2P-cores + 4 E-cores/ 8 Threads)
129	L015	Memory	8GB Soldered LPDDR5-4800 (Max Memory 8GB memory is soldered to the systemboard and not upgradable)
130	L015	Storage	512GB SSD M.2 2242 PCIe 4.0x4 NVMe (Supports one drive, up to 1TB M.2 2242 SSD)
131	L015	Display	5.6" Full HD (1920x1080) Panel Type: TN 250 nits brightness, Anti-glare
132	L015	Graphics	Integrated Intel UHD Graphics
133	L015	Audio	High Definition (HD) Audio User-facing stereo speakers, 1.5W x2, optimized with Dolby Audio, Microphone: 2x, Array
134	L015	Battery Information	Integrated 47Wh
135	L015	Power Description	65W Round Tip (3-pin)
136	L016	Operating System	Windows 11 Home
137	L016	Processor & Chipset	Intel Celeron N5095 (Quad-Core, up to 2.9GHz)
138	L016	Memory	16 GB LPDDR4 or LPDDR4x RAM
139	L016	Storage	256 GB NVMe SSD (M.2)
140	L016	Display	15.6-inch FHD (1920x1080) IPS panel
141	L016	Graphics	Intel® UHD Graphics
142	L016	Audio	HD Audio, typically features 4 speakers
143	L016	Battery Information	7.4V / 5000mAh (or 7.6V 5000mAh, approximately 37 Wh)
144	L016	Power Description	Type-C Power Adapter/Charger (often specified as 12V 3A)
145	L017	Operating System	Windows 11 Home
146	L017	Processor & Chipset	Intel® Processor N150 (4-cores, 4-threads)
147	L017	Memory	16GB DDR4 SO-DIMM (or LPDDR4)
148	L017	Storage	512GB NVMe SSD
149	L017	Display	15.6-inch FHD (1920x1080) IPS Panel
150	L017	Graphics	Integrated Intel® Graphics
151	L017	Audio	HD Audio, typically features 4 speakers
152	L017	Battery Information	7.4V 5000mAh (approx. 37 Wh)
153	L017	Power Description	Type-C 12V 3A (36W) Charger
154	L018	Operating System	Windows 11 Home
155	L018	Processor & Chipset	Intel® Core™ i5-1240P (12th Generation, 12 Cores, 16 Threads, up to 4.40 GHz)
156	L018	Memory	16GB (DDR5 or DDR4 SO-DIMM)
157	L018	Storage	512GB NVMe SSD
158	L018	Display	15.6-inch Full HD (1920x1080) IPS Panel
159	L018	Graphics	Integrated Intel Graphics
160	L018	Audio	HD Audio, 4 speakers
161	L018	Battery Information	7.6V 5000mAh
162	L018	Power Description	Type-C PD Charnger/Charging Port
163	L019	Operating System	Windows 11
164	L019	Processor & Chipset	Intel Core i5-1240P (12-Core, up to 4.4GHz Max Turbo)
165	L019	Memory	16GB DDR4 RAM
166	L019	Storage	512GB NVMe SSD
167	L019	Display	15.6" Full HD (1920x1080) IPS
168	L019	Graphics	Integrated Intel Iris Xe Graphics
169	L019	Audio	HD Audio, 4 speakers
170	L019	Battery Information	7.7V 5000mAh (Integrated Lithium-ion)
171	L019	Power Description	Type-C Charge
172	L020	Operating System	Windows 11 Home
173	L020	Processor & Chipset	AMD Ryzen™ 5 7430U (6 Cores, 12 Threads, up to 4.3 GHz)
174	L020	Memory	16GB DDR4 SO-DIMM
175	L020	Storage	512GB NVMe PCIe SSD
176	L020	Display	15.6-inch, Full HD (1920x1080), IPS Panel
177	L020	Graphics	AMD Radeon™ Graphics Radeon Vega 7 Graphics
178	L020	Audio	HD Audio, 4 speakers
179	L020	Battery Information	7.6V, 6000mAh (Approx. 45.6 Wh)
180	L020	Power Description	Type-C 45W Power Adapter
181	D001	Processor	AMD Ryzen 7 5700G
182	D001	Motherboard	A520M.H AM4
183	D001	RAM Capacity	8GB
184	D001	RAM Type Speed	DDR4 3200MHz
185	D001	SSD Capacity	120GB
186	D001	HDD Capacity	500GB
187	D001	Monitor Size	20" LED Monitor
188	D001	Case Model	X10 Lite Case
189	D001	PSU Wattage	750W
190	D002	Processor	intel Core I5 12400
191	D002	Motherboard	H610M MOBO
192	D002	RAM Capacity	8GB
193	D002	RAM Type Speed	DDR4 3200MHz
194	D002	SSD Capacity	120GB
195	D002	HDD Capacity	500GB
196	D002	Monitor Size	20" LED Monitor 
197	D002	Case Model	X10 Lite Case
198	D002	PSU Wattage	750w
199	D003	Processor	AMD Ryzeb 5 5600G
200	D003	Motherboard	A520M.H AM4
201	D003	RAM Capacity	8GB
202	D003	RAM Type Speed	DDR4 3200MHz
203	D003	SSD Capacity	120GB
204	D003	HDD Capacity	500GB
205	D003	Monitor Size	20" LED MONITOR
206	D003	Case Model	x10 Lite Case
207	D003	PSU Wattage	750w
208	D004	Processor	intel Core I3 12100
209	D004	Motherboard	H610M MOBO
210	D004	RAM Capacity	8GB
211	D004	RAM Type Speed	DDR4 3200MHz
212	D004	SSD Capacity	120GB
213	D004	HDD Capacity	500GB
214	D004	Monitor Size	20" LED Monitor
215	D004	Case Model	x10 Lite Case
216	D004	PSU Wattage	750w
217	D005	Processor	intel Core I7 12700
218	D005	Motherboard	H610M MOBO
219	D005	RAM Capacity	8GB
220	D005	RAM Type Speed	DDR4 3200MHz
221	D005	SSD Capacity	120GB
222	D005	HDD Capacity	500GB
223	D005	Monitor Size	20" LED Monitor
224	D005	Case Model	x10 Lite Case
225	D005	PSU Wattage	750w
226	D006	Brand	NVISION
227	D006	Model	ES27G1
228	D006	Display	27 inches
229	D006	Panel Type	VA Technology (Curved Screen, typically $1500\\text{R}$)
230	D006	Refresh Rate	165Hz
231	D006	Response Time 	1ms
232	D006	Resolution	Full HD(1920x1080)
233	D006	Interface	1xHDMI, 1xDisplay Port, 1xDVI, DC input
234	D007	Brand	NVISION
235	D007	Model	N2455 PRO
236	D007	Display	23.8 inches
237	D007	Panel Type	IPS
238	D007	Refresh Rate	100Hz
239	D007	Response Time 	1ms
240	D007	Resolution	Full HD(1920x1080)
241	D007	Interface	1xHDMI, 1xVGA
242	D008	Brand	NVISION
243	D008	Model	EG24S1
244	D008	Display	24 inches
245	D008	Panel Type	IPS
246	D008	Refresh Rate	165Hz
247	D008	Response Time 	1ms
248	D008	Resolution	Full HD(1920x1080)
249	D008	Interface	1xHDMI, 1xDisplay Port, Audio Out, DC input
250	D009	Brand	NVISION
251	D009	Model	IP24V3
252	D009	Display	23.8 inches
253	D009	Panel Type	IPS
254	D009	Refresh Rate	75Hz
255	D009	Response Time 	5ms
256	D009	Resolution	Full HD(1920x1080)
257	D009	Interface	1xHDMI, 1xVGA, DC Input
258	D010	Brand	NVISION
259	D010	Model	ES32G2
260	D010	Display	32 inches
261	D010	Panel Type	VA (HVA), Curved(1500R)
262	D010	Refresh Rate	165hz
263	D010	Response Time 	1ms
264	D010	Resolution	full HD(1920x1080)
265	D010	Interface	1xHDMI, 1xDisplay Port, 1xDVI, DC input
266	D011	Processor	Ryzen 7 5700X
267	D011	Graphics Card	SAPHIRE PURE RX 9060XT GOC
268	D011	Motherboard	B550MHP MOTHERBOARD
269	D011	RAM 	16GB TEAM ELITE DDR4 8X2
270	D011	SSD Capacity	960GB MSI SPATIUM SSD
271	D011	Power Supply	GS750 WHT 80+ BRONZE
272	D011	Case Model	DARKFLASH L285M MATX
273	D011	Cooling	ASTRO V3 BLOCK WHITE 2X
274	D012	Processor	Ryzen 7 5700X
275	D012	Graphics Card	GIGABYTE 16GB RX 9060XT OC
276	D012	Motherboard	GIGABYTE B550M DS3H R2
277	D012	RAM 	16GB TEAM ELITE DDR 8x2
278	D012	SSD Capacity	960GB MSI SPATIUM SSD
279	D012	Power Supply	CM MWE750 80+ BRONZE
280	D012	Case Model	TECWARE FORGE S
281	D012	Cooling	4x FANS
282	D013	Processor	RYZEN 5 5500
283	D013	Graphics Card	GIGABYTE 8GB RX 9060XT GOC
284	D013	Motherboard	B550MHP MOTHERBOARD
285	D013	RAM 	16GB TEAM ELITE DDR4 8X2
286	D013	SSD Capacity	960GB MSI SPATIUM SSD
287	D013	Power Supply	GS750 80+ BRONZE
288	D013	Case Model	SEAVIEW PAVILION
289	D013	Cooling	4x FANS
290	D014	Processor	RYZEN 5 5600X
291	D014	Graphics Card	XFX 16GB RX 9060XT OC
292	D014	Motherboard	B550MHP MOTHERBOARD
293	D014	RAM 	16GB TEAM ELITE DDR4 8X2
294	D014	SSD Capacity	960GB MSI SPATIUM SSD
295	D014	Power Supply	GS750 80+ BRONZE
296	D014	Case Model	TECWARE NEXUS AIR
297	D014	Cooling	2x FANS
298	D015	Processor	RYZEN 5 5600
299	D015	Graphics Card	SAPHIRE PURE 16GB RX 9060XT GOC
300	D015	Motherboard	B550MHP MOTHERBOARD
301	D015	RAM 	16GB TEAM ELITE DDR4 8X2
302	D015	SSD Capacity	960GB MSI SPATIUM SSD
303	D015	Power Supply	GS750 80+ BRONZE
304	D015	Case Model	TECWARE VISION M
305	D015	Cooling	4x FANS
306	C001	Brand	DeepCool
307	C001	Model	AK620 DIGITAL
308	C001	Net Weight	1486 g
309	C001	Heatpipes 	6pcs
310	C001	Fan Speed	500-1850 RPM
311	C001	Fan Airflow	68.99 CFM
312	C001	Fan Noise	28 dB(A)
313	C001	Fan Connector	4-pin PWM
314	C001	PSU Wattage	1.44 W
315	C002	Brand	DeepCool
316	C002	Model	AK620WH
317	C002	Net Weight	1456 g
318	C002	Heatpipes 	6pcs
319	C002	Fan Speed	500-1850 RPM
320	C002	Fan Airflow	68.99 CFM
321	C002	Fan Noise	28 dB(A)
322	C002	Fan Connector	4-pin PWM
323	C002	PSU Wattage	1.44 W
324	C003	Brand	DeepCool
325	C003	Model	AK620
326	C003	Net Weight	1456 g
327	C003	Heatpipes 	6pcs
328	C003	Fan Speed	500-1850 RPM
329	C003	Fan Airflow	68.99 CFM
330	C003	Fan Noise	28 dB(A)
331	C003	Fan Connector	4-pin PWM
332	C003	PSU Wattage	1.44 W
333	C004	Brand	DeepCool
334	C004	Model	AK620 DIGITAL WH
335	C004	Net Weight	1486 g
336	C004	Heatpipes 	6pcs
337	C004	Fan Speed	500-1850 RPM
338	C004	Fan Airflow	68.99 CFM
339	C004	Fan Noise	28 dB(A)
340	C004	Fan Connector	4-pin PWM
341	C004	PSU Wattage	1.44 W
342	C005	Brand	DeepCool
343	C005	Model	AK500S DIGITAL
344	C005	Net Weight	904 g
345	C005	Heatpipes 	5pcs
346	C005	Fan Speed	500-1850 RPM
347	C005	Fan Airflow	68.99 CFM
348	C005	Fan Noise	28 dB(A)
349	C005	Fan Connector	4-pin PWM
350	C005	PSU Wattage	1.44 W
351	C006	Brand	Cooler Master
352	C006	Model	MB311L ARGB
353	C006	Dimensions	435.5 x 217.5 x 410mm (L x W x H)
354	C006	Weight	5.47kg
355	C006	Max GPU Length	344mm
356	C006	Materials	Steel, Mesh, Plastic, and Tempered Glass (side panel)
357	C006	I/O Panels	2x USB 3.2 GEN 1 (USB 3.0), 1x 3.5mm Audio Jack, 1x 3.5mm Mic Jack
358	C007	Brand	Cooler Master
359	C007	Model	MasterBox MB520 TG
360	C007	Dimensions	496 x 217 x 468mm  (L x W x H)
361	C007	Weight	6.6kg
362	C007	Max GPU Length	410mm
363	C007	Materials	Steel, Plastic, and Tempered Glass (side panel)
364	C007	I/O Panels	2x USB 3.2 GEN 1 (USB 3.0) Audio In/Out
365	C008	Brand	DarkFlash
366	C008	Model	DK431
367	C008	Dimensions	470 x 205 x 485mm  (L x W x H)
368	C008	Weight	5.48kg
369	C008	Max GPU Length	400mm
370	C008	Materials	Iron,ABS,Tempered Glass
371	C008	I/O Panels	1x USB 3.0, 2x USB 2.0, HD Audio, Power, Reset
372	C009	Brand	DarkFlash
373	C009	Model	C285MP
374	C009	Dimensions	440 x 285 x 370mm (L x W x H)
375	C009	Weight	6.9kg
376	C009	Max GPU Length	410mm
377	C009	Materials	Steel, Tempered Glass
378	C009	I/O Panels	1x USB 3.0, 2x USB 2.0, HD Audio, LED, Power, Reset
379	C010	Brand	DarkFlash
380	C010	Model	DK210
381	C010	Dimensions	410 x 210 x 480mm (L x W x H)
382	C010	Weight	4.9kg
383	C010	Max GPU Length	360mm
384	C010	Materials	Steel, Tempered Glass
385	C010	I/O Panels	1x USB 3.0, 2x USB 2.0, HD Audio, LED, Power, Reset
386	A001	Brand	Redragon
387	A001	Model	LAMIA 2
388	A001	Diameter	40mm drivers
389	A001	Frequency	20 - 20k Hz
390	A001	Impedance	32 Ohm
391	A001	Interface	USB
392	A001	Weight	360g
393	A001	Features	7.1 Virtual Surround Sound, In-line audio Control
394	A002	Brand	Redragon
395	A002	Model	Epeius
396	A002	Diameter	40mm
397	A002	Frequency	100 - 10k Hz
398	A002	Impedance	640 + 15% Ohm
399	A002	Interface	USB
400	A002	Weight	600g
401	A002	Features	7.1 Virtual Surround Sound, In-line audio Control
402	A003	Brand	Redragon
403	A003	Model	Diomedes
404	A003	Diameter	53mm
405	A003	Frequency	20 - 20k Hz
406	A003	Impedance	32 Ohm
407	A003	Interface	USB Type-C and 3.5mm
408	A003	Weight	188g
409	A003	Features	7.1 Virtual Surround Sound, Noise Cancellation Mic
410	A004	Brand	Redragon
411	A004	Model	Hylas
412	A004	Diameter	50mm
413	A004	Frequency	20 - 20k Hz
414	A004	Impedance	16 +15% Ohm
415	A004	Interface	USB Type-C and 3.5mm, 2x USB
416	A004	Weight	450g
417	A004	Features	High Noise Cancellation Mic, Built-in volume adjustment
418	A005	Brand	Redragon
419	A005	Model	Mento
420	A005	Diameter	50mm
421	A005	Frequency	20 - 20k Hz
422	A005	Impedance	16 Ohm
423	A005	Interface	3.5mm x 2 + USB
424	A005	Weight	500 g
425	A005	Features	 Built-in volume adjustment, Passive Noise Isolation
426	A006	Brand	Redragon
427	A006	Model	Antonium PRO
428	A006	Type	Mechanical Gaming Keyboard
429	A006	Layout Size	80% (Tenkeyless/TKL)
430	A006	Number of Keys	87 Keys
431	A006	Connectivity	Tri-Mode: USB-C Wired, 2.4 GHz Wireless, Bluetooth (BT 3.0/5.0)
432	A006	Dimensions	373 x 140 x 37 mm
433	A006	Weight	960g
434	A006	Battery Capacity	4000mAh (Lithium Polymer)
435	A007	Brand	Redragon
436	A007	Model	LAKSHMI
437	A007	Type	Mechanical Gaming Keyboard
438	A007	Layout Size	60%
439	A007	Number of Keys	61 Keys
440	A007	Connectivity	Wired
441	A007	Dimensions	291.7 x 101.7 x 36 mm 
442	A007	Weight	569.4 g 
443	A007	Battery Capacity	N/A (Wired)
444	A008	Brand	Redragon
445	A008	Model	GLORIA PRO
446	A008	Type	Mechanical Gaming Keyboard
447	A008	Layout Size	90%
448	A008	Number of Keys	94 Keys
449	A008	Connectivity	Tri-Mode (Wired, 2.4Ghz, Bluetooth)
450	A008	Dimensions	374 x 140 x 37 mm
451	A008	Weight	916g 
452	A008	Battery Capacity	3000mAh
453	A009	Brand	Redragon
454	A009	Model	DEVARAJAS
455	A009	Type	Mechanical Gaming Keyboard
456	A009	Layout Size	Full-Size
457	A009	Number of Keys	104 Keys
458	A009	Connectivity	Wired (Gold-plated USB)
459	A009	Dimensions	434 x 124 x 40 mm
460	A009	Weight	1.18kg
461	A009	Battery Capacity	N/A (Wired)
462	A010	Brand	Redragon
463	A010	Model	NOVA PRO
464	A010	Type	Mechanical Gaming Keyboard
465	A010	Layout Size	65%
466	A010	Number of Keys	68 Keys
467	A010	Connectivity	Tri-Mode (Wired, 2.4Ghz, Bluetooth)
468	A010	Dimensions	336 x 119 x 40 mm
469	A010	Weight	632g 
470	A010	Battery Capacity	2500mAh
471	A011	Brand	Redragon
472	A011	Model	SWAIN
473	A011	Type	Gaming Mouse
474	A011	Connectivity	Wired (USB)
475	A011	Sensor	Optical Tracking
476	A011	Max DPI	100 to 26,000 DPI
477	A011	Buttons	9 Programmable Buttons
478	A011	Design	Ergonomic, Right-Handed (Palm Grip)
479	A012	Brand	Redragon
480	A012	Model	TRIDENT
481	A012	Type	Gaming Mouse
482	A012	Connectivity	Wired (USB)
483	A012	Sensor	Optical Sensor
484	A012	Max DPI	100 to 8,000 DPI
485	A012	Buttons	7 Programmable
486	A012	Design	Ergonomic, Right-Handed with textured side grips
487	A013	Brand	Redragon
488	A013	Model	PLANK RGB
489	A013	Type	Gaming Mouse
490	A013	Connectivity	Wired (USB)
491	A013	Sensor	Gaming-grade Optical Sensor
492	A013	Max DPI	100 to 16,000 DPI
493	A013	Buttons	7 Programmable
494	A013	Design	Ergonomic with textured side grip
495	A014	Brand	Redragon
496	A014	Model	TRIDENT LITE
497	A014	Type	Gaming Mouse
498	A014	Connectivity	Wired (USB)
499	A014	Sensor	Optical Sensor
500	A014	Max DPI	100 to 8,000 DPI
501	A014	Buttons	7 or 11 Programmable
502	A014	Design	Ergonomic, Skin-friendly coating, Claw-grip focus
503	A015	Brand	Redragon
504	A015	Model	PREDATOR
505	A015	Type	Gaming Mouse
506	A015	Connectivity	Wired (USB)
507	A015	Sensor	Optical Sensor
508	A015	Max DPI	100 to 8,000 DPI
509	A015	Buttons	11 Programmable
510	A015	Design	Ergonomic, Claw-grip design with frosted coating & rubber texture
511	S001	Brand	JBL
512	S001	Model	PartyBox 710
513	S001	Type	Portable Party Speaker
514	S001	Frequency	35Hz – 20kHz
515	S001	Connectivity	Bluetooth (v5.1), USB Input, Aux-In
516	S001	Transducers	2 x 216mm (8") woofers and 2 x 70mm (2.75") tweeters
517	S001	Input Ports	Guitar and dual Mic inputs
518	S001	Output Power	800W RMS of powerful JBL Original Pro Sound
519	S002	Brand	JBL
520	S002	Model	PartyBox Encore
521	S002	Type	Portable Party Speaker
522	S002	Frequency	50 Hz – 20 kHz
523	S002	Connectivity	Bluetooth 5.1, USB, AUX-in, True Wireless Stereo (TWS
524	S002	Transducers	1 x 5.25" woofer, 2 x 1.75" tweeters
525	S002	Input Ports	Wired Mic-in, AUX-in (3.5mm), USB
526	S002	Output Power	USB Charge Out
527	S003	Brand	JBL
528	S003	Model	PartyBox Club 120
529	S003	Type	Portable Party Speaker
530	S003	Frequency	40 Hz – 20 kHz
531	S003	Connectivity	Bluetooth 5.4, USB, AUX-in, Auracast™ (Multi-speaker connection), TWS
532	S003	Transducers	2 x 5.25" woofers, 2 x 2.25" tweeters
533	S003	Input Ports	Dual Mic-in, Guitar-in, AUX-in (3.5mm), USB
534	S003	Output Power	800W RMS of powerful JBL Original Pro Sound
535	S004	Brand	JBL
536	S004	Model	PartyBox Encore Essential
537	S004	Type	Portable Party Speaker
538	S004	Frequency	50 Hz – 20 kHz
539	S004	Connectivity	Bluetooth 5.1, USB, AUX-in, TWS (Original Encore Essential) / Bluetooth 5.4, USB, AUX-in
540	S004	Transducers	1 x 5.25" woofer, 2 x 1.75" tweeters
541	S004	Input Ports	Wired Mic-in, AUX-in (3.5mm), USB
542	S004	Output Power	USB Charge Out
543	S005	Brand	JBL
544	S005	Model	PartyBox Encore 2
545	S005	Type	Portable Party Speaker
546	S005	Frequency	40 Hz – 20 kHz
547	S005	Connectivity	Bluetooth 5.4, USB, AUX-in, Auracast™ (Multi-speaker connection), TWS
548	S005	Transducers	1 x 5.25" woofer, 2 x 0.75" dome tweeters
549	S005	Input Ports	Mic-in, Guitar-in, AUX-in (3.5mm), USB
550	S005	Output Power	USB Charge Out
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (product_id, name, brand, category, subcategory, price, image_url) FROM stdin;
L001	Nitro 15 ANV15-51-541P 	Acer	Laptops	-	47499.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354170/L001_ntyrkv.jpg
L006	Vivobook Go 15 E1504FA-NJ1527W Laptop	Asus	Laptops	-	23999.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354486/L006_mxh7bn.jpg
L007	Vivobook Gaming X16 K3605VC-RP493W	Asus	Laptops	-	43995.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354484/L007_icsxcp.jpg
L008	Vivobook Go 14 E1404GA-NK350WSM	Asus	Laptops	-	25599.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354485/L008_c9y9en.jpg
L009	TUF GAMING A15 FA506NCR-HN007W	Asus	Laptops	-	50299.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354486/L009_ceso2b.jpg
L010	Vivobook E510KA-BR818W	Asus	Laptops	-	19699.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354485/L010_kjir9d.jpg
L011	LOQ Gaming 15IAX9E 83LK00A1PH	Lenovo	Laptops	-	44300.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354553/L011_kuarfx.jpg
L012	IdeaPad 3 15IRH10 Slim 3 (83K100CLPH)	Lenovo	Laptops	-	32500.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354555/L012_z919tc.jpg
L013	IdeaPad 1 15IJL7 82LX00AAPH	Lenovo	Laptops	-	19999.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354550/L013_lsszeo.jpg
L014	ThinkPad E16 Gen 2 (16" AMD) 	Lenovo	Laptops	-	53701.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354551/L014_rbasfo.jpg
L015	IdeaPad 3-15IRU8 Slim 3 (82X700FYPH)	Lenovo	Laptops	-	26599.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354551/L015_ha7nsv.jpg
L016	NL100P-N50162A	Ningmei	Laptops	-	14500.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354605/L016_s1mnwm.jpg
L017	NL150P-N15162A	Ningmei	Laptops	-	13760.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354600/L017_cduqcj.jpg
L018	NL150P-N15165A	Ningmei	Laptops	-	14760.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354601/L018_ceg7lp.jpg
L019	NL500 124165A 	Ningmei	Laptops	-	23999.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354604/L019_uecamf.jpg
L020	NLR500 R74165 	Ningmei	Laptops	-	21990.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354605/L020_ipbaja.jpg
D001	AMD Ryzen 7 5700G	-	Desktop/PCs	PC Bundles	17999.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354675/D001_scpwgc.jpg
D002	Intel Core i5 12400	-	Desktop/PCs	PC Bundles	18699.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354671/D002_jpc0bw.jpg
D003	AMD Ryzen 5 5600G	-	Desktop/PCs	PC Bundles	14999.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354672/D003_glwvi9.jpg
D004	Intel Core i3 12100	-	Desktop/PCs	PC Bundles	15699.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354672/D004_b1p1sm.jpg
D005	Intel Core i7 12700	-	Desktop/PCs	PC Bundles	25599.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354674/D005_gcvmss.jpg
D006	NVISION ES27G1	NVISION	Desktop/PCs	PC Monitors	7110.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354723/D006_jr692m.jpg
D007	NVISION N2455 PRO	NVISION	Desktop/PCs	PC Monitors	3495.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354717/D007_pkatj7.jpg
D008	NVISION EG24S1	NVISION	Desktop/PCs	PC Monitors	5044.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354718/D008_s0jsie.jpg
D009	NVISION N2455 PRO	NVISION	Desktop/PCs	PC Monitors	3495.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354720/D009_fcqpjj.jpg
D010	NVISION ES32G2	NVISION	Desktop/PCs	PC Monitors	9170.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354722/D010_xw7phm.jpg
D011	Sapphire Pure RX 9060XT G0C	Sapphire	Desktop/PCs	System Units	44999.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354775/D011_xnnja6.jpg
D012	Gigabyte 16GB RX 9060 XT 0C	Gigabyte	Desktop/PCs	System Units	48599.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354768/D012_o23mdi.jpg
D013	Gigabyte 8GB RX 9060XT G0C	Gigabyte	Desktop/PCs	System Units	36599.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354769/D013_tv0joh.jpg
D014	XFX 16GB RX 9060XT 0C	XFX	Desktop/PCs	System Units	41199.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354770/D014_nmrtay.jpg
D015	Sapphire Pure 16GB RX 9060XT G0C	Sapphire	Desktop/PCs	System Units	40199.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354773/D015_mtjyou.jpg
C001	AK620 Digital	DeepCool	Components	Cooling Systems	3790.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354845/C001_skm1w3.jpg
C002	AK620WH	DeepCool	Components	Cooling Systems	3550.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354838/C002_ohmr95.jpg
C003	AK500S Digital	DeepCool	Components	Cooling Systems	2750.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354840/C003_uhrz6k.jpg
C004	AK620BK	DeepCool	Components	Cooling Systems	2900.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354844/C004_hwynbo.jpg
C005	AK620 Digital WH	DeepCool	Components	Cooling Systems	4000.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354842/C005_j97e26.jpg
C006	MB311L ARGB	Cooler Master	Components	PC Cases	3595.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355043/C006_q6vduz.jpg
C007	MB520 TG	Cooler Master	Components	PC Cases	5550.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355038/C007_cqf1p5.jpg
C008	DK431	DarkFlash	Components	PC Cases	4000.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355040/C008_oscxaq.jpg
C009	C285MP	DarkFlash	Components	PC Cases	2799.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355040/C009_dzljdl.jpg
C010	DK210	DarkFlash	Components	PC Cases	3297.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355045/C010_gb5evq.jpg
A001	Redragon Lamia 2	Redragon	Accessories	Headset	1350.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355101/A001_v6gpmj.jpg
A002	Redragon Epius	Redragon	Accessories	Headset	1550.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355093/A002_ohkbu4.jpg
A003	Redragon Diomedes	Redragon	Accessories	Headset	1550.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355095/A003_d9tfag.jpg
A004	Redragon Hylas	Redragon	Accessories	Headset	950.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355096/A004_g3wz3a.jpg
A005	Redragon Mento	Redragon	Accessories	Headset	900.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355098/A005_g2i2yp.jpg
A006	Antonium Pro Wireless Casket Gaming Keyboard	Redragon	Accessories	Keyboard	2849.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355155/A006_oegfv3.jpg
A007	Lakshmi Detachable Wire Mechanical Keyboard	Redragon	Accessories	Keyboard	1300.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355148/A007_astxbx.jpg
A008	Gloria Pro Tri-mode Hot Swappable Gasket Mounted	Redragon	Accessories	Keyboard	3315.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355149/A008_lql07q.jpg
A009	Devarajas Mechanical Gaming Keyboard 	Redragon	Accessories	Keyboard	3195.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355152/A009_zs829z.jpg
A010	Nova Pro Wireless Gasket RGB Gaming Keyboard	Redragon	Accessories	Keyboard	2405.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355157/A010_h6ozs4.jpg
A011	Swain Wired Gaming Mouse	Redragon	Accessories	Mouse	1299.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355211/A011_ypsvmz.jpg
A012	Trident 8000 DPI Tri-mode Gaming Mouse	Redragon	Accessories	Mouse	1300.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355205/A012_bqxl8x.jpg
A013	Plank RGB 3-Mode Wireless Gaming Mouse	Redragon	Accessories	Mouse	1100.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355214/A013_hrdkew.jpg
A014	Trident Lite 7 Programmable Buttons	Redragon	Accessories	Mouse	800.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355202/A014_doblwg.jpg
A015	Predator 8000 DPI Wired Optical Gamer Mouse	Redragon	Accessories	Mouse	900.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355208/A015_f80d9t.jpg
S001	PARTYBOX 710	JBL	Speakers	-	33199.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355272/S001_txzhju.jpg
S002	PARTYBOX ENCORE	JBL	Speakers	-	17649.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355262/S002_gjono3.jpg
S003	PARTYBOX CLUB 120	JBL	Speakers	-	17649.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355263/S003_r46q3r.jpg
S004	PARTYBOX ESSENTIAL	JBL	Speakers	-	16960.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355275/S004_wd9hbi.jpg
S005	PARTYBOX 520	JBL	Speakers	-	31800.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761355266/S005_ndsfyf.jpg
L002	Aspire Lite 15 AL15-72P-59YM	Acer	Laptops	-	33200.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354170/L002_knusmw.jpg
L003	Aspire 7 A715-76G-53J9 Notebook	Acer	Laptops	-	38300.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354170/L003_ysbm3j.jpg
L004	Nitro V ANV15-41-R7K3	Acer	Laptops	-	37000.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354170/L004_vbxijb.jpg
L005	Aspire Lite 15 AL15-41P-R16X 	Acer	Laptops	-	28999.00	https://res.cloudinary.com/dwtmr4wqt/image/upload/v1761354170/L005_wygzku.jpg
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (review_id, product_id, user_alias, review_text, category, subcategory, brand, date_posted) FROM stdin;
1	L001	Rebecca Z.	One of the best acer laptop in the market.	Laptops	-	Acer	2025-08-21 00:00:00
2	L002	Brandon A.	Best for budget laptop in Acer product	Laptops	-	Acer	2025-12-12 00:00:00
3	L003	Stephen N.	Well made Laptop for a fair price	Laptops	-	Acer	2025-03-16 00:00:00
4	L004	Eric C.	Good GPU in a  friendly price	Laptops	-	Acer	2025-09-30 00:00:00
5	L005	Patrick D.	Budget friendly and good for daily use.	Laptops	-	Acer	2025-04-18 00:00:00
6	L006	Cynthia Q.	Recommend a budget laptop that work great	Laptops	-	Asus	2025-02-09 00:00:00
7	L007	Dylan L.	Great performance Asus laptop	Laptops	-	Asus	2025-06-06 00:00:00
8	L008	Victoria Y.	Best use in my school works	Laptops	-	Asus	2025-08-02 00:00:00
9	L009	Ryan Y.	Good performing gaming laptop	Laptops	-	Asus	2025-01-04 00:00:00
10	L010	Sarah K.	Good for office work and in daily use.	Laptops	-	Asus	2025-07-16 00:00:00
11	L011	Richard N.	A powerful GPU good for gaming	Laptops	-	Lenovo	2025-07-28 00:00:00
12	L012	Judith F.	Good for editing like photoshop and video editing	Laptops	-	Lenovo	2025-09-22 00:00:00
13	L013	Margaret E.	Laptop for saving files and documents 	Laptops	-	Lenovo	2025-05-22 00:00:00
14	L014	Kathleen W.	One of LENOVO fair price good gaming laptop	Laptops	-	Lenovo	2025-06-15 00:00:00
15	L015	Helen F.	Recommend for school works and office works	Laptops	-	Lenovo	2025-05-29 00:00:00
16	L016	Linda F.	A great budget-friendly laptop with fast SSD storage	Laptops	-	Ningmei	2025-06-07 00:00:00
17	L017	Alexander N.	This laptop delivers smooth performance for office	Laptops	-	Ningmei	2025-08-25 00:00:00
18	L018	Nicholas Z.	The 15.6-inch Full HD display makes it ideal for watching videos	Laptops	-	Ningmei	2025-01-28 00:00:00
19	L019	Samuel U.	Perfect for students and professionals who need reliable performance	Laptops	-	Ningmei	2025-05-13 00:00:00
20	L020	Gary B.	Its combination of 16GB RAM and 256GB SSD make the process fast	Laptops	-	Ningmei	2025-05-06 00:00:00
21	D001	Brenda N.	This bundle is budget friendly good for using in academics	Desktop/PCs	PC Bundles	-	2025-05-07 00:00:00
22	D002	Sharon D.	The bundle is reliable good for daily use	Desktop/PCs	PC Bundles	-	2025-01-19 00:00:00
23	D003	Andrew P.	The set is good for starters and low maintenance	Desktop/PCs	PC Bundles	-	2025-05-19 00:00:00
24	D004	Christian F.	The bundle is great using in my office works	Desktop/PCs	PC Bundles	-	2025-01-08 00:00:00
25	D005	Jennifer H.	Bundle has a good CPU processor good blend with the ssd	Desktop/PCs	PC Bundles	-	2025-03-26 00:00:00
26	D006	Elizabeth Y.	immersive gaming experience with its 27-inch curved	Desktop/PCs	PC Monitors	NVISION	2025-09-03 00:00:00
27	D007	Cristel F.	modern monitor that combines stunning visuals for everyday use.	Desktop/PCs	PC Monitors	NVISION	2025-08-16 00:00:00
28	D008	Kimberly Q.	165Hz refresh rate provides ultra-smooth gameplay response.	Desktop/PCs	PC Monitors	NVISION	2025-05-07 00:00:00
29	D009	Noah L.	Monitor that has fluid performance for daily use.	Desktop/PCs	PC Monitors	NVISION	2025-02-16 00:00:00
30	D010	Kevin G.	The curved display enhances viewing comfort	Desktop/PCs	PC Monitors	NVISION	2025-02-07 00:00:00
31	D011	Russell Z.	This pre-built set up is perfect with the GPU	Desktop/PCs	System Units	Sapphire	2025-03-22 00:00:00
32	D012	Henry R.	One of the best pre-built in the market.	Desktop/PCs	System Units	Gigabyte	2025-09-26 00:00:00
33	D013	Laura S.	Best price for a system unit with complete parts	Desktop/PCs	System Units	Gigabyte	2025-09-26 00:00:00
34	D014	Juster M.	a powerful system unit with a good price	Desktop/PCs	System Units	XFX	2025-01-31 00:00:00
35	D015	Donna D.	System unit with budget and powerful GPU	Desktop/PCs	System Units	Sapphire	2025-07-09 00:00:00
36	C001	John R.	It offers powerful cooling performance with a sleek, modern design.	Components	Cooling Systems	DeepCool	2025-07-22 00:00:00
37	C002	Justin F.	Perfect for gamers and PC builders who want efficient cooling	Components	Cooling Systems	DeepCool	2025-05-10 00:00:00
38	C003	Nathan H.	Its digital display showing real-time temperature and fan speed.	Components	Cooling Systems	DeepCool	2025-08-07 00:00:00
39	C004	Adam R.	A top-tier air cooler that balances performance	Components	Cooling Systems	DeepCool	2025-09-23 00:00:00
40	C005	Daniel B.	Delivers exceptional thermal control even under heavy workloads	Components	Cooling Systems	DeepCool	2025-03-08 00:00:00
41	C006	Anna S.	offers excellent airflow and stunning RGB lighting in a compact design.	Components	PC Cases	Cooler Master	2025-04-24 00:00:00
42	C007	Jeremy B.	Perfect for gamers who want style and cooling performance	Components	PC Cases	Cooler Master	2025-05-05 00:00:00
43	C008	Jason X.	Its mesh front panel and dual ARGB fans keep your system cool	Components	PC Cases	DarkFlash	2025-06-11 00:00:00
44	C009	Matthew B.	A great choice for building a high-performance and appealing PC setup.	Components	PC Cases	DarkFlash	2025-01-29 00:00:00
45	C010	Mark A.	This case combines efficient ventilation with a balanced gaming rig.	Components	PC Cases	DarkFlash	2025-07-07 00:00:00
46	A001	David B.	immersive sound perfect for gaming and streaming.	Accessories	Headset	Redragon	2025-06-26 00:00:00
47	A002	Paul X.	Its RGB lighting and included stand make it both stylish and practical	Accessories	Headset	Redragon	2025-08-09 00:00:00
48	A003	Dorothy Y.	Comfortable ear cushions and quality make long gaming sessions	Accessories	Headset	Redragon	2025-07-31 00:00:00
49	A004	Scott N.	A budget-friendly gaming headset that offers impressive audio	Accessories	Headset	Redragon	2025-03-07 00:00:00
50	A005	Christine R.	Great value for gamers who want performance, comfort, and RGB	Accessories	Headset	Redragon	2025-02-05 00:00:00
51	A006	Mary J.	offers smooth, responsive keystrokes perfect for gaming and typing.	Accessories	Keyboard	Redragon	2025-08-02 00:00:00
52	A007	Mary J.	The vibrant RGB lighting adds a premium look to any gaming setup.	Accessories	Keyboard	Redragon	2025-08-07 00:00:00
53	A008	William V.	a wireless design and gasket mount make it comfortable to use	Accessories	Keyboard	Redragon	2025-03-24 00:00:00
54	A009	Lisa N.	A stylish keyboard that doesn’t compromise on performance	Accessories	Keyboard	Redragon	2025-09-20 00:00:00
55	A010	Lauren H.	Perfect for gamers who want durable and cable-free keyboard 	Accessories	Keyboard	Redragon	2025-06-08 00:00:00
56	A011	Timothy X.	mouse delivers precise tracking and smooth performance	Accessories	Mouse	Redragon	2025-07-24 00:00:00
57	A012	Edward C.	Its ergonomic design ensures comfort even during long use	Accessories	Mouse	Redragon	2025-02-04 00:00:00
58	A013	Anthony N.	The customizable RGB lighting gives it a stylish and dynamic look.	Accessories	Mouse	Redragon	2025-03-09 00:00:00
59	A014	Lyn S.	great budget-friendly gaming mouse with responsive buttons	Accessories	Mouse	Redragon	2025-02-28 00:00:00
60	A015	Kelly V.	Perfect for gamers seeking accuracy and comfort in one device.	Accessories	Mouse	Redragon	2025-05-16 00:00:00
61	S001	Ronald Y.	 PartyBox delivers powerful, room-filling sound perfect for any party.	Speakers	-	JBL	2025-05-19 00:00:00
62	S002	Angela I.	With deep bass and clear highs, this speaker brings concerts	Speakers	-	JBL	2025-03-18 00:00:00
63	S003	Thomas T.	Built tough and stylish it’s ideal for both indoor and outdoor gatherings	Speakers	-	JBL	2025-08-19 00:00:00
64	S004	Steven R.	RGB lighting adds an exciting visual touch to your music experience.	Speakers	-	JBL	2025-06-16 00:00:00
65	S005	Debra U.	Great for small gatherings, it delivers clear vocals and punchy bass.	Speakers	-	JBL	2025-05-18 00:00:00
66	L001	Gal V.	Amazing laptop that caters to my workload!!	Laptops	\N	ACER	2025-10-27 12:36:18.123135
67	A003	Jeremy B.	This headset is definitely worth the price! Will buy again once an upgraded version is released :)	Accessories	Headset	\N	2025-10-27 12:46:41.809457
68	L020	Edward C.	Ningmei is a budget-friendly laptop that actually performs really well for its price!	Laptops	\N	NINGMEI	2025-10-27 12:51:26.958666
69	A008	Zachary B.	I use it a lot for gaming!	Accessories	Keyboard	\N	2025-10-27 12:53:16.611848
70	D010	Cherry C.	Wow! The monitor provides vivid colors!	Desktop/PCs	PC Monitors	\N	2025-10-27 12:56:48.759165
71	D003	Amethyst C.	PC Concept gave me such a sweet deal!	Desktop/PCs	PC Bundles	\N	2025-10-27 13:38:45.755094
72	L019	Andrei S.	Laptop works perfectly both for gaming and corporate work!	Laptops	\N	NINGMEI	2025-10-28 07:15:18.741862
73	L004	Krystal J.	wow amazing laptop omg!!	Laptops	\N	ACER	2025-10-28 07:30:51.962958
74	L001	Gabriel DG.	Napaka-ganda ng laptop grabe! Buy na kayo guys!	Laptops	\N	ACER	2025-10-29 13:54:49.971839
75	L006	Joshua C.	Grabe! Ang galing ng laptop! Very sulit	Laptops	\N	ASUS	2025-10-29 15:18:57.156495
76	C001	John Stuart M.	This cooling system is one of the best!	Components	Cooling Systems	\N	2025-10-29 15:27:45.44613
\.


--
-- Name: blogs_blog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blogs_blog_id_seq', 1, false);


--
-- Name: product_specifications_spec_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_specifications_spec_id_seq', 1, false);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 76, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: blogs blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_pkey PRIMARY KEY (blog_id);


--
-- Name: product_specifications product_specifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_specifications
    ADD CONSTRAINT product_specifications_pkey PRIMARY KEY (spec_id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- Name: product_specifications uq_product_spec_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_specifications
    ADD CONSTRAINT uq_product_spec_name UNIQUE (product_id, spec_name);


--
-- Name: reviews fk_review_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_review_product FOREIGN KEY (product_id) REFERENCES public.products(product_id) ON DELETE CASCADE;


--
-- Name: product_specifications fk_spec_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_specifications
    ADD CONSTRAINT fk_spec_product FOREIGN KEY (product_id) REFERENCES public.products(product_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

