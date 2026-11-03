import { models } from "mongoose";
import { list } from "postcss";

export const translations = {
	eliteSeries: {
		h1_title: {
			en: "ELITE SERIES",
			fr: "SÉRIE ÉLITE",
		},
		h2_choose_your_model: {
			en: "Choose your model",
			fr: "Choisissez votre modèle",
		},
		modelsTitle_elite4: {
			en: "ELITE 4L",
			fr: "ÉLITE 4L",
		},
		modelsTitle_elite_2_2L: {
			en: "ELITE 2+2L",
			fr: "ÉLITE 2+2L",
		},
		modelsTitle_elite_4_2: {
			en: "ELITE 4+2",
			fr: "ÉLITE 4+2",
		},
		modelsTitle_elite_mini: {
			en: "ELITE Mini_1",
			fr: "ÉLITE Mini_1",
		},
		p_4wd_available: {
			en: "4WD on ELITE 4L and 6L",
			fr: "4x4 sur les ÉLITE 4L and 6L",
		},
		elite4_list: {
			en: [
				"4-wheel disc brakes",
				"Carplay & Android Auto touch screen",
				"Led lights",
				"Seatbelts",
				"48V 160Ah lithium battery",
				"Electric parking brake",
				"Rear view camera",
				"16 inch wheel",
				"Integrated charger",
				"Trunk",
				"Controller Curtis 400A",
				"Sound system with 24 speakers",
				"Turn signal, stop light",
				"6.3 kw Motor with EM brake",
			],
			fr: [
				"Freins à disque 4 roues",
				"Écran tactile Carplay & Android Auto",
				"Lumières LED",
				"Ceintures de sécurité",
				"Batterie lithium 48V 160Ah",
				"Frein de stationnement électrique",
				"Caméra de recul",
				"Roue de 16 pouces",
				"Chargeur intégré",
				"Coffre arrière",
				"Contrôleur Curtis 400A",
				"Système audio avec 24 haut-parleurs",
				"Clignotant, feu d'arrêt",
				"Moteur 6.3 kw avec frein EM",
			],
		},
		elite6_list: {
			en: [
				"4-wheel disc brakes",
				"Carplay & Android Auto touch screen",
				"Led lights",
				"Seatbelts",
				"48V 160Ah lithium battery",
				"Electric parking brake",
				"Rear view camera",
				"16 inch wheel",
				"Integrated charger",
				"Trunk",
				"Controller Curtis 400A",
				"Sound system with 24 speakers",
				"Turn signal, stop light",
				"6.3 kw Motor with EM brake",
				"Running boards",
				"Front bumper"
			],
			fr: [
				"Freins à disque 4 roues",
				"Écran tactile Carplay & Android Auto",
				"Lumières LED",
				"Ceintures de sécurité",
				"Batterie lithium 48V 160Ah",
				"Frein de stationnement électrique",
				"Caméra de recul",
				"Roue de 16 pouces",
				"Chargeur intégré",
				"Coffre arrière",
				"Contrôleur Curtis 400A",
				"Système audio avec 24 haut-parleurs",
				"Clignotant, feu d'arrêt",
				"Moteur 6.3 kw avec frein EM",
				"Marchepieds",
				"Pare-chocs avant",
			],
		},
		elite4L_list: {
			en: [
				"4-wheel disc brakes",
				"Carplay & Android Auto touch screen",
				"Led lights",
				"Seatbelts",
				"48V 160Ah lithium battery",
				"Electric parking brake",
				"Rear view camera",
				"14 inch wheel",
				"Integrated charger",
				"Trunk",
				"Controller Curtis 400A",
				"Sound system with 24 speakers",
				"Turn signal, stop light",
				"6.3 kw rear Motor with EM brake",
				"4 kw front motor",
				"Running boards",
				"Front bumper"
			],
			fr: [
				"Freins à disque 4 roues",
				"Écran tactile Carplay & Android Auto",
				"Lumières LED",
				"Ceintures de sécurité",
				"Batterie lithium 48V 160Ah",
				"Frein de stationnement électrique",
				"Caméra de recul",
				"Roue de 16 pouces",
				"Chargeur intégré",
				"Coffre arrière",
				"Contrôleur Curtis 400A",
				"Système audio avec 24 haut-parleurs",
				"Clignotant, feu d'arrêt",
				"Moteur arriere 6.3 kw avec frein EM",
				"Moteur avant 4 kw",
				"Marchepieds",
				"Pare-chocs avant"
			],
		},
		elite6L_list: {
			en: [
				"4-wheel disc brakes",
				"Carplay & Android Auto touch screen",
				"Led lights",
				"Seatbelts",
				"48V 160Ah lithium battery",
				"Electric parking brake",
				"Rear view camera",
				"16 inch wheel",
				"Integrated charger",
				"Trunk",
				"Controller Curtis 400A",
				"Sound system with 24 speakers",
				"Turn signal, stop light",
				"6.3 kw rear Motor with EM brake",
				"4 kw front motor",
				"Running boards",
				"Front bumper"
			],
			fr: [
				"Freins à disque 4 roues",
				"Écran tactile Carplay & Android Auto",
				"Lumières LED",
				"Ceintures de sécurité",
				"Batterie lithium 48V 160Ah",
				"Frein de stationnement électrique",
				"Caméra de recul",
				"Roue de 16 pouces",
				"Chargeur intégré",
				"Coffre arrière",
				"Contrôleur Curtis 400A",
				"Système audio avec 24 haut-parleurs",
				"Clignotant, feu d'arrêt",
				"Moteur arriere 6.3 kw avec frein EM",
				"Moteur avant 4 kw",
				"Marchepieds",
				"Pare-chocs avant"
			],
		},
		h3_colorPicker: {
			en: "Color Options",
			fr: "Options de couleur",
		},
		p_colorPicker: {
			en: "*Please note that due to variations between screens, actual colors may vary. Check with your dealer for actual colors.",
			fr: "*Veuillez noter qu'en raison des variations entre les écrans, les couleurs réelles peuvent varier. Vérifiez auprès de votre revendeur les couleurs réelles.",
		},
		p_touch_screen_compatible: {
			en: "Touchscreen compatible with Apple Carplay & Android Auto",
			fr: "Écran tactile compatible avec Apple Carplay & Android Auto",
		},
		p_touch_screen_aftermarks: {		
			en: "Apple CarPlay and Android Auto are aftermarket features, not included as part of the golf car's factory-installed products. Dealers may specify or offer these features separately. Additional fees may apply. Please check with your local dealer for details",
			fr: "Apple CarPlay et Android Auto sont des fonctionnalités après-vente, non incluses dans les produits installés en usine de la voiturette de golf. Les concessionnaires peuvent spécifier ou offrir ces fonctionnalités séparément. Des frais supplémentaires peuvent s'appliquer. Veuillez vérifier auprès de votre revendeur local pour plus de détails",
		},
		h2_span_discover: {
			en: "EXPLORE ELITE SERIES",
			fr: "EXPLOREZ LA SÉRIE ÉLITE",
		},
		h2_discover: {
			en: "Discover the comfort and innovation",
			fr: "Découvrez le confort et l'innovation",
		},
		h2_discoverNext: {
			en: "of our carts.",
			fr: "de nos voiturettes.",
		},
		p_discover: {
			en: "The ELITE Series offers a range of high-performance electric vehicles designed for both urban and off-road adventures. With cutting-edge technology and sleek designs, the Elite Series is perfect for those who seek both style and functionality.",
			fr: "La série ÉLITE propose une gamme de véhicules électriques de hautes performances conçus pour les aventures urbaines et tout-terrain. Avec une technologie de pointe et des designs élégants, la série Elite est parfaite pour ceux qui recherchent à la fois style et fonctionnalité.",
		},
		t_features_screen: {
			en: "10.1-INCH MULTI-FUNCTIONAL TOUCHSCREEN",
			fr: "ÉCRAN TACTILE MULTIFONCTION DE 10,1 POUCES",
		},
		p_features_screen: {
			en: "Elevate your adventures with the 10.1-inch touchscreen, Apple CarPlay and Android Auto compatible, offering seamless access to navigation, music, and calls, keeping you connected and entertained on every drive.",
			fr: "Élevez vos aventures avec l'écran tactile de 10,1 pouces, compatible avec Apple CarPlay et Android Auto, offrant un accès fluide à la navigation, à la musique et aux appels, vous gardant connecté et diverti à chaque trajet.",			
		},
		t_features_speakers: {
			en: "IMMERSIVE SURROUND SOUND EXPERIENCE",
			fr: "EXPÉRIENCE SONORE IMMERSIVE SURROUND",
		},
		p_features_speakers: {
			en: "Experience immersive audio with a 24-speaker sound system that delivers rich, surrounding sound, elevating every drive with high-quality acoustics.",
			fr: "Découvrez un son immersif avec un système audio de 24 haut-parleurs qui offre un son riche et surround, élevant chaque trajet avec une acoustique de haute qualité.",
		},
		t_features_4x4: {
			en: "ON-DEMAND 4-WHEEL DRIVE",
			fr: "4X4 À LA DEMANDE",
		},
		p_features_4x4: {
			en: "Elevate your driving experience with the ELITE on-demand 4-wheel drive system. Featuring dual independent electric motors and controllers, this system seamlessly switches between 2-wheel and 4-wheel drive modes to suit your preferences. Enjoy smooth, refined handling and enhanced stability on any course.",
			fr: "Élevez votre expérience de conduite avec le système 4x4 à la demande de l'ELITE. Doté de deux moteurs électriques et contrôleurs indépendants, ce système passe facilement entre les modes 2 roues motrices et 4 roues motrices pour s'adapter à vos préférences. Profitez d'une maniabilité fluide et raffinée et d'une stabilité améliorée sur n'importe quel parcours.",			
		},
		t_features_power_steering: {
			en: "Electric Power Steering",
			fr: "Direction assistée électrique",
		},
		p_features_power_steering: {
			en: "Enjoy precise, effortless control with advanced electric power steering, designed to deliver smooth, responsive handling for a truly refined driving experience. Whether navigating tight spaces or cruising open paths, this feature ensures comfortable, fatigue-free steering, making every journey smoother and more enjoyable.",
			fr: "Profitez d'un contrôle précis et sans effort grâce à la direction assistée électrique avancée, conçue pour offrir une maniabilité fluide et réactive pour une expérience de conduite vraiment raffinée. Que vous naviguiez dans des espaces restreints ou que vous parcouriez des chemins ouverts, cette fonctionnalité garantit une direction confortable et sans fatigue, rendant chaque voyage plus fluide et agréable.",
		},
		t_features_charging_pads: {
			en: "DUAL WIRELESS CHARGING PAD",
			fr: "TAPIS DE CHARGE SANS FIL DOUBLE",
		},
		p_features_charging_pads: {
			en: "Power Up on the Go - Keep your devices powered up effortlessly with the dual wireless charging pad on the dash, designed to charge two cell phones simultaneously, ensuring you stay connected without the clutter of cables.",
			fr: "Rechargez en déplacement - Gardez vos appareils chargés sans effort avec le tapis de charge sans fil double sur le tableau de bord, conçu pour charger deux téléphones portables simultanément, vous assurant de rester connecté sans l'encombrement des câbles.",
		},
		t_features_fridge: {
			en: "BUILT-IN DASH REFRIGERATOR",
			fr: "RÉFRIGÉRATEUR INTÉGRÉ DANS LE TABLEAU DE BORD",
		},
		p_features_fridge: {
			en: "Refreshments at Your Fingertips - Keep your refreshments cool and within reach with the built-in dash refrigerator, adding a touch of convenience and luxury to every journey.",
			fr: "Rafraîchissements à portée de main - Gardez vos rafraîchissements au frais et à portée de main avec le réfrigérateur intégré dans le tableau de bord, ajoutant une touche de commodité et de luxe à chaque voyage.",
		},
		t_features_rear_storage: {
			en: "FOLDABLE REAR STORAGE BASKET",
			fr: "PANIER DE RANGEMENT ARRIÈRE PLIABLE",
		},
		p_features_rear_storage: {
			en: "Maximize convenience with the foldable rear storage basket, featuring a portable inner fabric utility box for easy storage. Simple to fold and unfold, it’s designed to keep your essentials organized and accessible on the go.",
			fr: "Maximisez la commodité avec le panier de rangement arrière pliable, doté d'une boîte utilitaire intérieure en tissu portable pour un rangement facile. Simple à plier et à déplier, il est conçu pour garder vos essentiels organisés et accessibles en déplacement.",
		},
		t_features_cooler: {
			en: "RETRACTABLE TRAY & PORTABLE COOLER",
			fr: "PLATEAU RÉTRACTABLE ET GLACIÈRE PORTABLE",
		},
		p_features_cooler: {
			en: "Enjoy ultimate versatility with the retractable rear tray, equipped with a 74-QT, detachable cooler that doubles as a portable unit. Featuring wheels and pull handles, it’s easy to take along, keeping refreshments or supplies cool and convenient wherever you go.",
			fr: "Profitez d'une polyvalence ultime avec le plateau arrière rétractable, équipé d'une glacière détachable de 74-QT qui fait également office d'unité portable. Dotée de roues et de poignées de traction, elle est facile à emporter, gardant les rafraîchissements ou les fournitures au frais et à portée de main où que vous alliez.",
		},
		t_features_bag_holders: {
			en: "EXTENDED TRAY WITH DUAL BAG HOLDERS",
			fr: "PLATEAU ÉTENDU AVEC DOUBLE PORTE-SAC",
		},
		p_features_bag_holders: {
			en: "Transform the rear of your golf car with the fully extended retractable tray, equipped with an optional golf bag holder extension to securely carry up to four golf bags. Perfect for group outings, it provides maximum storage and functionality for all your golfing essentials.",
			fr: "Transformez l'arrière de votre voiturette de golf avec le plateau rétractable entièrement étendu, équipé d'une extension de porte-sac de golf optionnelle pour transporter en toute sécurité jusqu'à quatre sacs de golf. Parfait pour les sorties en groupe, il offre un maximum de rangement et de fonctionnalité pour tous vos essentiels de golf.",
		},
		t_features_dash: {
			en: "ADVANCED DASH PANEL",
			fr: "PANNEAU DE TABLEAU DE BORD AVANCÉ",
		},
		p_features_dash: {
			en: "Featuring a push start button, gear selection knob, high and low speed switch, and an emergency flashing button for ultimate convenience and safety at your fingertips.",
			fr: "Doté d'un bouton de démarrage, d'un sélecteur de vitesses, d'un commutateur de vitesse haute et basse, et d'un bouton d'urgence pour une commodité et une sécurité ultimes à portée de main.",
		},
		t_features_running_boards: {
			en: "RUNNING BOARDS",
			fr: "MARCHEPIEDS",
		},
		p_features_running_boards: {
			en: "ELITE L models features an illuminous running board, enhancing both the vehicle's functionality and its aesthetic appeal. This feature not only facilitates easier entry and exit but also adds a distinctive, glowing touch to the vehicle's profile, improving visibility and safety in low-light conditions.",
			fr: "Les modèles ÉLITE L sont dotés d'un marchepied lumineux, améliorant à la fois la fonctionnalité du véhicule et son attrait esthétique. Cette caractéristique facilite non seulement l'entrée et la sortie, mais ajoute également une touche distinctive et lumineuse au profil du véhicule, améliorant la visibilité et la sécurité dans des conditions de faible luminosité.",
		},
		t_features_seats: {
			en: "ELITE ICONIC LUXURY SEATS",
			fr: "SIÈGES DE LUXE EMBLÉMATIQUES DE L'ÉLITE",
		},
		p_features_seats: {
			en: "Experience unmatched sporty comfort with the luxurious seats, expertly crafted from premium fine leather and detailed with exquisite stitching. Each seat is designed to provide a secure, enveloping feel, enhanced by soft yet resilient thigh support. Equipped with three-point seatbelts, these seats offer a perfect blend of elegance and safety, elevating every journey.",
			fr: "Découvrez un confort sportif inégalé avec les sièges luxueux, fabriqués à partir de cuir fin de haute qualité et ornés de coutures exquises. Chaque siège est conçu pour offrir une sensation sécurisée et enveloppante, renforcée par un soutien des cuisses doux mais résistant. Équipés de ceintures de sécurité à trois points, ces sièges offrent un mélange parfait d'élégance et de sécurité, élevant chaque voyage.",
		},
		t_features_seat_acc: {
			en: "ALL-IN-ONE PASSENGER COMFORT",
			fr: "CONFORT PASSAGER TOUT-EN-UN",
		},
		p_features_seat_acc: {
			en: "Enhance rear-seat functionality with the thoughtfully designed seat back cover assembly, featuring an integrated handrail, convenient cupholder, concealed hook, storage pocket, and USB charging ports. This all-in-one design brings comfort, convenience, and added utility to every passenger's journey.",
			fr: "Améliorez la fonctionnalité des sièges arrière avec l'assemblage de couverture de dossier de siège soigneusement conçu, doté d'une main courante intégrée, d'un porte-gobelet pratique, d'un crochet dissimulé, d'une poche de rangement et de ports de charge USB. Ce design tout-en-un apporte confort, commodité et utilité supplémentaire à chaque voyage des passagers.",
		},
		t_features_leds: {
			en: "FOLDABLE WINDSHIELD WITH SLIDING SUB-WINDOWS",
			fr: "PARE-BRISE PLIABLE AVEC SOUS-FENÊTRES COULISSANTES",
		},
		p_features_leds: {
			en: "LED LIGHTING",
			fr: "ÉCLAIRAGE LED",
		},
		t_features_wheels: {
			en: "16X7 ALUMINUM WHEELS 225/45R16 RADIAL TIRES",
			fr: "ROUES EN ALUMINIUM 16X7 PNEUS RADIAUX 225/45R16",
		},
		p_features_wheels: {
			en: "Upgrade your ride with 16x8.5 aluminum wheels paired with 225/45R16 radial tires, designed to deliver both style and performance. These durable, lightweight aluminum wheels ensure improved handling and stability, while the low-profile radial tires provide a smooth, responsive drive, enhancing traction and control on every journey.",
			fr: "Améliorez votre conduite avec des roues en aluminium 16x8.5 associées à des pneus radiaux 225/45R16, conçues pour offrir à la fois style et performance. Ces roues en aluminium durables et légères garantissent une meilleure maniabilité et stabilité, tandis que les pneus radiaux à profil bas offrent une conduite fluide et réactive, améliorant la traction et le contrôle à chaque trajet.",
		},
		t_features_bigger_wheels: {
			en: "16X8.5 ALUMINUM WHEELS 24X10R16 QUIET ALL-TERRAIN TIRES",
			fr: "ROUES EN ALUMINIUM 16X8.5 PNEUS TOUT-TERRAIN SILENCIEUX 24X10R16",
		},
		p_features_bigger_wheels: {
			en: "ELITE L models are equipped with 16x8.5-inch aluminum wheels and 24x10R16 all-terrain tires, delivering enhanced performance and superior traction on diverse surfaces. This combination provides a smooth, controlled ride while maintaining the strength and durability required for more demanding terrains.",
			fr: "Les modèles ÉLITE L sont équipés de roues en aluminium de 16x8,5 pouces et de pneus tout-terrain de 24x10R16, offrant des performances améliorées et une traction supérieure sur des surfaces diverses. Cette combinaison assure une conduite fluide et contrôlée tout en maintenant la robustesse et la durabilité nécessaires pour des terrains plus exigeants.",
		},
		h2_spec_title: {
			en: "SPECIFICATIONS",
			fr: "SPÉCIFICATIONS",
		},
		h3_spec_dimensions: {
			en: "DIMENSIONS",
			fr: "DIMENSIONS",
		},
		h3_spec_power: {
			en: "POWER",
			fr: "PUISSANCE",
		},
		h3_spec_features: {
			en: "FEATURES",
			fr: "FONCTIONNALITÉS",
		},
		list_spec_power: {
			en: [
				"48V Lithium Battery with Smart Management System",
				"6.3 kW motor with EM brake",
				"400 A, AC controller",
				"Integrated 25 A charger",
				"Maximum speed ≥ 40 km/h (25 mph)"
			],
			fr: [
				"Batterie lithium 48V avec système de gestion intelligent",
				"Moteur 6.3 kW avec frein EM",
				"Contrôleur 400 A, AC",
				"Chargeur intégré 25 A",
				"Vitesse maximale ≥ 40 km/h (25 mph)"
			],
		},
		list_spec_power4x4: {
			en: [
				"48V Lithium Battery with Smart Management System",
				"6.3 kW and 4 kW motor with EM brake",
				"400 A, AC controller",
				"Integrated 25 A charger",
				"Maximum speed ≥ 40 km/h (25 mph)"
			],
			fr: [
				"Batterie lithium 48V avec système de gestion intelligent",
				"Moteur 6.3 kW et 4 kW avec frein EM",
				"Contrôleur 400 A, AC",
				"Chargeur intégré 25 A",
				"Vitesse maximale ≥ 40 km/h (25 mph)"
			],
		},
		list_spec_features: {
			en: [
				"Adjustable steering column",
				"Electric Power Steering",
				"10.1 inch Touchscreen with CarPlay Compatibility",
				"Foldable Basket with Portable Utility Box",
				"Extended Rear Tray with Optional Golf Bag Holder Extension for up to 4 bags",
				"Multifunction Dash with Built-in Refrigerator & Wireless Cell Phone Charger",
				"Automotive-grade & Marine-style Luxury Seat",
				"Surrounding Sound System with Seat Bucket Speakers, Roof-mounted Speakers and Dual Soundbar",
				"Cupholders, USB Ports, and Storage Pockets for All Passengers",
				"LED Headlights and Tailights",
				"Foldable windshield with slidable air vents",
				"Automobile Style Rear Bumper",
				"Premium Brushguard",
				"16×8.5 Aluminum Wheel with 225/45R16 Radial Tire",
				"Automotive E-coat Chassis"
			],
			fr: [
				"Colonne de direction réglable",
				"Direction assistée électrique",
				"Écran tactile 10,1 pouces avec compatibilité CarPlay",
				"Panier pliable avec boîte utilitaire portable",
				"Plateau arrière étendu avec extension de porte-sac de golf optionnelle pour jusqu'à 4 sacs",
				"Tableau de bord multifonctionnel avec réfrigérateur intégré et chargeur sans fil pour téléphone portable",
				"Siège de luxe de style automobile et marin",
				"Système audio surround avec haut-parleurs de siège, haut-parleurs montés sur le toit et barre de son double",
				"Porte-gobelets, ports USB et poches de rangement pour tous les passagers",
				"Lumières LED avant et arrière",
				"Pare-brise pliable avec aérations coulissantes",
				"Pare-chocs arrière de style automobile",
				"Pare-chocs avant premium",
				"Roue en aluminium 16x8,5 avec pneu radial 225/45R16",
				"Châssis E-coat de style automobile"
			],
		},
			list_spec_features4x4: {
			en: [
				"Adjustable steering column",
				"Electric Power Steering",
				"10.1 inch Touchscreen with CarPlay Compatibility",
				"Foldable Basket with Portable Utility Box",
				"Extended Rear Tray with Optional Golf Bag Holder Extension for up to 4 bags",
				"Multifunction Dash with Built-in Refrigerator & Wireless Cell Phone Charger",
				"Automotive-grade & Marine-style Luxury Seat",
				"Surrounding Sound System with Seat Bucket Speakers, Roof-mounted Speakers and Dual Soundbar",
				"Cupholders, USB Ports, and Storage Pockets for All Passengers",
				"LED Headlights and Tailights",
				"LED Illuminous Running Board",
				"Foldable windshield with slidable air vents",
				"Automobile Style Rear Bumper",
				"Premium Brushguard",
				"16x8.5 Aluminum Wheel with 24X10R16 Quiet All-Terrain Tires",
				"Automotive E-coat Chassis"
			],
			fr: [
				"Colonne de direction réglable",
				"Direction assistée électrique",
				"Écran tactile 10,1 pouces avec compatibilité CarPlay",
				"Panier pliable avec boîte utilitaire portable",
				"Plateau arrière étendu avec extension de porte-sac de golf optionnelle pour jusqu'à 4 sacs",
				"Tableau de bord multifonctionnel avec réfrigérateur intégré et chargeur sans fil pour téléphone portable",
				"Siège de luxe de style automobile et marin",
				"Système audio surround avec haut-parleurs de siège, haut-parleurs montés sur le toit et barre de son double",
				"Porte-gobelets, ports USB et poches de rangement pour tous les passagers",
				"Lumières LED avant et arrière",
				"Marchepieds lumineux",
				"Pare-brise pliable avec aérations coulissantes",
				"Pare-chocs arrière de style automobile",
				"Pare-chocs avant premium",
				"Roue en aluminium 16x8,5 avec pneus tout-terrain silencieux 24X10R16",
				"Châssis E-coat de style automobile"
			],
		},
		h2_shrink_microphone: {
			en: "MICROPHONE",	
			fr: "MICROPHONE",
		},
		p_shrink_microphone: {
			en: "ELITE microphone boosts speech recognition by effectively reducing issues like background noise and distance from the speaker, enhancing communication clarity.",
			fr: "Le microphone ÉLITE améliore la reconnaissance vocale en réduisant efficacement les problèmes tels que le bruit de fond et la distance par rapport au locuteur, améliorant ainsi la clarté de la communication.",
		},
		h2_shrink_cupHolders: {
			en: "CUP HOLDERS",
			fr: "PORTE-GOBELETS",
		},
		p_shrink_cupHolders: {
			en: "ELITE cup holders are crafted for convenience, securely holding beverages and small belongings to keep essentials close during your ride.",
			fr: "Les porte-gobelets ÉLITE sont conçus pour la commodité, maintenant en toute sécurité les boissons et les petits objets pour garder les essentiels à portée de main pendant votre trajet.",
		},
		h2_shrink_airVent: {
			en: "SLIDEABLE AIR VENTS",
			fr: "AÉRATIONS COULISSANTES",
		},
		p_shrink_airVent: {
			en: "Optimize airflow and comfort with adjustable sliding vents on ELITE's windshield, designed to provide customizable ventilation while you drive.",
			fr: "Optimisez le flux d'air et le confort avec les aérations coulissantes réglables sur le pare-brise de l'ELITE, conçues pour offrir une ventilation personnalisable pendant que vous conduisez.",
		},
		h2_shrink_storage: {
			en: "STORAGE COMPARTMENT",
			fr: "COMPARTIMENT DE RANGEMENT",
		},
		p_shrink_storage: {
			en: "ELITE glove box is designed for security and accessibility, providing a convenient space to store personal items and valuables securely within reach during your ride.",
			fr: "La boîte à gants ÉLITE est conçue pour la sécurité et l'accessibilité, offrant un espace pratique pour ranger des objets personnels et des valeurs en toute sécurité à portée de main pendant votre trajet.",
		},
		h2_shrink_ajustable_steering: {
			en: "ADJUSTABLE STEERING COLUMN",
			fr: "COLONNE DE DIRECTION RÉGLABLE",
		},
		p_shrink_ajustable_steering: {
			en: "ELITE adjustable steering wheel enhances driving ease and control. Designed for comfort and convenience, it adjusts up and down to optimize the driver's view and the distance to the steering wheel, while also improving grip comfort, ensuring a more personalized driving experience.",
			fr: "La colonne de direction réglable ÉLITE améliore la facilité et le contrôle de conduite. Conçue pour le confort et la commodité, elle s'ajuste vers le haut et vers le bas pour optimiser la vue du conducteur et la distance par rapport au volant, tout en améliorant le confort de prise en main, garantissant une expérience de conduite plus personnalisée.",
		},
		h2_shrink_tailLight: {
			en: "TAIL LIGHTS",
			fr: "FEUX ARRIÈRE",
		},	
		p_shrink_tailLight: {
			en: "ELITE taillights feature LED brake lights and turning signals, offering enhanced visibility and safety with energy-efficient, long-lasting illumination.",
			fr: "Les feux arrière ELITE sont équipés de feux de freinage et de clignotants à LED, offrant une visibilité et une sécurité accrues grâce à un éclairage économe en énergie et durable.",
		},
		h2_shrink_mirror: {
			en: "PANORAMIC REAR VIEW MIRROR",
			fr: "MIROIR DE VUE ARRIÈRE PANORAMIQUE",
		},
		p_shrink_mirror: {
			en: "The panoramic mirror in ELITE offers a 180-degree field of view, significantly enhancing visibility. This feature boosts safety and situational awareness, helping drivers navigate more confidently.",
			fr: "Le miroir panoramique de l'ÉLITE offre un champ de vision de 180 degrés, améliorant considérablement la visibilité. Cette fonctionnalité renforce la sécurité et la conscience de la situation, aidant les conducteurs à naviguer plus en confiance.",
		},
		h2_shrink_sideMirror: {
			en: "SIDE MIRROR WITH TURNING SIGNALS",
			fr: "MIROIR LATÉRAL AVEC CLIGNOTANTS",
		},
		p_shrink_sideMirror: {
			en: "ELITE enhances driving safety with mirrors that provide a comprehensive rear view and feature integrated turn signals, facilitating smoother lane changes, parking maneuvers, and turns.",
			fr: "L'ÉLITE améliore la sécurité de conduite avec des miroirs qui offrent une vue arrière complète et intègrent des clignotants, facilitant les changements de voie, les manœuvres de stationnement et les virages.",
		},
		h2_shrink_sideGrabHandles: {
			en: "SIDE GRAB HANDLES",
			fr: "POIGNÉES LATÉRALES",
		},
		p_shrink_sideGrabHandles: {
			en: "ELITE enhances accessibility and stability with grab handles on both driver and passenger sides for easy entry and exit.",
			fr: "L'ÉLITE améliore l'accessibilité et la stabilité avec des poignées de maintien de chaque côté du conducteur et du passager pour faciliter l'entrée et la sortie.",
		},
		h2_shrink_brushGuards: {
			en: "BRUSH GUARDS FOR LIFTED MODELS",
			fr: "PARE-BRISE POUR MODÈLES SURÉLEVÉS",
		},
		p_shrink_brushGuards: {
			en: "The ELITE 4L and 6L models are equipped with a durable brushguard that helps protect the front end from brush and debris while navigating through tough terrains, ensuring both style and safety on adventurous drives.",
			fr: "Les modèles ÉLITE 4L et 6L sont équipés d'un pare-chocs robuste qui aide à protéger l'avant du véhicule contre les broussailles et les débris lors de la navigation dans des terrains difficiles, garantissant à la fois style et sécurité lors de trajets aventureux.",
		},
		h2_shrink_hitch: {
			en: "TOWING HITCH RECEIVER",
			fr: "RÉCEPTEUR D'ATTELAGE",
		},
		p_shrink_hitch: {
			en: "ELITE is equipped with standard towing hitch receiver, designed for easy attachment of trailers and other accessories, enhancing the vehicle's utility and versatility.",
			fr: "L'ÉLITE est équipée d'un récepteur d'attelage standard, conçu pour une attache facile de remorques et d'autres accessoires, améliorant l'utilité et la polyvalence du véhicule.",
		},
		h2_shrink_pedals: {
			en: "ACCELERATOR & BRAKE PEDAL",
			fr: "ACCÉLÉRATEUR ET PÉDALE DE FREIN",
		},
		p_shrink_pedals: {
			en: "Ergonomically designed to ensure precise control and responsive handling.",
			fr: "Conçues de manière ergonomique pour garantir un contrôle précis et une maniabilité réactive.",
		},

	},
} as const;

type TranslationKeys = typeof translations.eliteSeries.h1_title;
export type Language = keyof TranslationKeys;
