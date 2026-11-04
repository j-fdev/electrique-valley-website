// Legal pages (Law 25), form consent lines and page titles for search engines.
// DRAFT prepared by Tyrem Technologies (November 2026) from the studio templates
// (tyrem-studio/business/legal/modeles-pages-legales.md). To be approved by
// Electrique Valley and confirmed by a lawyer. Items marked TO CONFIRM in docs/tasks.md.

const CONTACT_EMAIL = 'electriquevalley@hotmail.com';
const CONTACT_PHONE = '450 747-1525';

export const legal = {
    contactEmail: CONTACT_EMAIL,
    contactPhone: CONTACT_PHONE,
    updated: {
        fr: 'Dernière mise à jour : 4 novembre 2026',
        en: 'Last updated: November 4, 2026',
    },
    links: {
        privacy: { fr: 'Politique de confidentialité', en: 'Privacy policy' },
        terms: { fr: 'Conditions d’utilisation', en: 'Terms of use' },
        credit: { fr: 'Site conçu par Tyrem Technologies', en: 'Website by Tyrem Technologies' },
    },
    consent: {
        contactBefore: {
            fr: 'J’accepte qu’Electrique Valley utilise ces renseignements pour répondre à ma demande, comme décrit dans la ',
            en: 'I agree that Electrique Valley may use this information to answer my request, as described in the ',
        },
        policyLink: { fr: 'politique de confidentialité', en: 'privacy policy' },
        newsletter: {
            fr: 'J’accepte de recevoir l’infolettre d’Electrique Valley par courriel. Je peux me désabonner en tout temps.',
            en: 'I agree to receive the Electrique Valley newsletter by email. I can unsubscribe at any time.',
        },
        required: {
            fr: 'Veuillez cocher la case pour continuer.',
            en: 'Please check the box to continue.',
        },
    },
    unsubscribe: {
        title: { fr: 'Se désabonner de l’infolettre', en: 'Unsubscribe from the newsletter' },
        intro: {
            fr: 'Vous ne recevrez plus nos courriels et votre adresse sera supprimée de notre liste.',
            en: 'You will stop receiving our emails and your address will be deleted from our list.',
        },
        emailLabel: { fr: 'Votre adresse courriel', en: 'Your email address' },
        confirm: { fr: 'Confirmer le désabonnement', en: 'Confirm unsubscription' },
        sendLink: { fr: 'Recevoir un lien de confirmation', en: 'Send me a confirmation link' },
        noLink: {
            fr: 'Entrez l’adresse inscrite à l’infolettre : nous lui enverrons un lien pour confirmer.',
            en: 'Enter the address subscribed to the newsletter: we will send it a link to confirm.',
        },
        error: { fr: 'Une erreur est survenue. Réessayez plus tard.', en: 'Something went wrong. Please try again later.' },
    },
    privacy: {
        title: { fr: 'Politique de confidentialité', en: 'Privacy policy' },
        sections: [
            {
                title: {
                    fr: 'Responsable de la protection des renseignements personnels',
                    en: 'Person in charge of personal information',
                },
                paragraphs: [
                    {
                        fr: 'Le propriétaire d’Electrique Valley est le responsable de la protection des renseignements personnels.',
                        en: 'The owner of Electrique Valley is the person in charge of protecting personal information.',
                    },
                    {
                        fr: `Courriel : ${CONTACT_EMAIL} · Téléphone : ${CONTACT_PHONE} · Salaberry-de-Valleyfield (Québec)`,
                        en: `Email: ${CONTACT_EMAIL} · Phone: ${CONTACT_PHONE} · Salaberry-de-Valleyfield, Quebec`,
                    },
                ],
            },
            {
                title: { fr: 'Renseignements que nous recueillons', en: 'Information we collect' },
                paragraphs: [
                    {
                        fr: 'Formulaire de contact : votre prénom, votre nom, votre numéro de téléphone, votre courriel et votre message. Pour une demande de revendeur, nous demandons aussi le nom de votre entreprise, votre ville et votre province.',
                        en: 'Contact form: your first name, last name, phone number, email and message. For a dealer request, we also ask for your business name, town and province.',
                    },
                    {
                        fr: 'Infolettre : votre adresse courriel et la date de votre inscription.',
                        en: 'Newsletter: your email address and the date you subscribed.',
                    },
                    {
                        fr: 'Nous ne demandons que ce qui est utile pour vous répondre. Le site ne vend rien en ligne et ne demande aucun renseignement de paiement.',
                        en: 'We only ask for what we need to answer you. The site sells nothing online and never asks for payment information.',
                    },
                ],
            },
            {
                title: { fr: 'Témoins (cookies)', en: 'Cookies' },
                paragraphs: [
                    {
                        fr: 'Ce site n’utilise aucun témoin de suivi, de mesure d’audience ou de publicité, et n’enregistre rien dans votre navigateur. La langue est choisie par l’adresse de la page (par exemple /en pour l’anglais).',
                        en: 'This site uses no tracking, analytics or advertising cookies and stores nothing in your browser. The language is set by the page address (for example /en for English).',
                    },
                    {
                        fr: 'Les polices de caractères du site sont fournies par Google Fonts : votre navigateur se connecte alors aux serveurs de Google, qui reçoivent votre adresse IP.',
                        en: 'The site’s fonts are provided by Google Fonts: your browser connects to Google’s servers, which receive your IP address.',
                    },
                    {
                        fr: 'Si nous ajoutons un jour un outil de mesure d’audience, il restera désactivé tant que vous ne l’aurez pas accepté, et cette politique sera mise à jour.',
                        en: 'If we ever add an analytics tool, it will stay off until you accept it, and this policy will be updated.',
                    },
                ],
            },
            {
                title: { fr: 'Pourquoi nous les utilisons', en: 'Why we use them' },
                paragraphs: [
                    {
                        fr: 'Pour répondre à votre demande (information, essai routier, demande de revendeur) et vous envoyer une confirmation par courriel. Si vous êtes inscrit à l’infolettre, pour vous envoyer nos nouvelles et nos promotions.',
                        en: 'To answer your request (information, test ride, dealer request) and send you a confirmation by email. If you subscribed to the newsletter, to send you our news and promotions.',
                    },
                    {
                        fr: 'Nous ne vendons ni ne louons vos renseignements, et nous ne les partageons pas à des fins de marketing.',
                        en: 'We never sell or rent your information, and we do not share it for marketing purposes.',
                    },
                ],
            },
            {
                title: { fr: 'Qui y a accès', en: 'Who has access' },
                paragraphs: [
                    {
                        fr: 'Seules les personnes d’Electrique Valley qui traitent les demandes ont accès à vos renseignements. Notre fournisseur Web, qui entretient le site, peut y accéder uniquement pour ce travail, selon une entente écrite qui l’oblige à les protéger.',
                        en: 'Only the Electrique Valley staff who handle requests have access to your information. Our web provider, who maintains the site, may access it only for that work, under a written agreement that requires it to protect the information.',
                    },
                    {
                        fr: 'Le site et sa base de données sont hébergés au Canada par Amazon Web Services. Les courriels sont envoyés par le service Gmail de Google, et notre boîte de réception est chez Outlook.com de Microsoft; leurs serveurs peuvent être situés à l’extérieur du Québec et du Canada. Nous choisissons des fournisseurs qui protègent adéquatement les renseignements, comme l’exige la loi.',
                        en: 'The site and its database are hosted in Canada by Amazon Web Services. Emails are sent through Google’s Gmail service, and our inbox is at Microsoft’s Outlook.com; their servers may be located outside Quebec and Canada. We choose providers that adequately protect information, as the law requires.',
                    },
                ],
            },
            {
                title: { fr: 'Sécurité', en: 'Security' },
                paragraphs: [
                    {
                        fr: 'Les échanges avec le site sont chiffrés (HTTPS) et l’accès aux renseignements est protégé par mot de passe. En cas d’incident de confidentialité présentant un risque de préjudice sérieux, nous avisons la Commission d’accès à l’information et les personnes concernées.',
                        en: 'Exchanges with the site are encrypted (HTTPS) and access to the information is password-protected. If a privacy incident presents a risk of serious harm, we notify the Commission d’accès à l’information and the people concerned.',
                    },
                ],
            },
            {
                title: { fr: 'Conservation', en: 'How long we keep it' },
                paragraphs: [
                    {
                        fr: 'Les demandes reçues par le formulaire de contact sont supprimées après 12 mois si elles ne mènent pas à un achat. L’adresse courriel de l’infolettre est conservée jusqu’à votre désabonnement, puis supprimée.',
                        en: 'Requests received through the contact form are deleted after 12 months if they do not lead to a purchase. Your newsletter email address is kept until you unsubscribe, then deleted.',
                    },
                ],
            },
            {
                title: { fr: 'Vos droits', en: 'Your rights' },
                paragraphs: [
                    {
                        fr: 'Vous pouvez demander à consulter, corriger ou supprimer vos renseignements, à en recevoir une copie dans un format technologique structuré et couramment utilisé, ou retirer votre consentement, en écrivant au responsable. Nous répondons dans un délai de 30 jours.',
                        en: 'You can ask to see, correct or delete your information, to receive a copy in a structured, commonly used technological format, or withdraw your consent, by writing to the person in charge. We answer within 30 days.',
                    },
                    {
                        fr: 'Pour quitter l’infolettre, cliquez sur le lien de désabonnement au bas de nos courriels ou rendez-vous à la page electriquevalley.com/desabonnement. Votre adresse est alors supprimée.',
                        en: 'To leave the newsletter, click the unsubscribe link at the bottom of our emails or go to electriquevalley.com/en/unsubscribe. Your address is then deleted.',
                    },
                    {
                        fr: 'Si vous n’êtes pas satisfait de notre réponse, vous pouvez porter plainte auprès de la Commission d’accès à l’information du Québec.',
                        en: 'If you are not satisfied with our answer, you can file a complaint with the Commission d’accès à l’information du Québec.',
                    },
                ],
            },
        ],
    },
    terms: {
        title: { fr: 'Conditions d’utilisation', en: 'Terms of use' },
        sections: [
            {
                title: { fr: 'Qui exploite ce site', en: 'Who runs this site' },
                paragraphs: [
                    {
                        fr: `Le site electriquevalley.com est exploité par Electrique Valley, à Salaberry-de-Valleyfield (Québec). Courriel : ${CONTACT_EMAIL} · Téléphone : ${CONTACT_PHONE}.`,
                        en: `The electriquevalley.com website is run by Electrique Valley, in Salaberry-de-Valleyfield, Quebec. Email: ${CONTACT_EMAIL} · Phone: ${CONTACT_PHONE}.`,
                    },
                    {
                        fr: 'En utilisant ce site, vous acceptez les présentes conditions.',
                        en: 'By using this site, you accept these terms.',
                    },
                ],
            },
            {
                title: { fr: 'Information, prix et disponibilité', en: 'Information, prices and availability' },
                paragraphs: [
                    {
                        fr: 'Le contenu du site est fourni à titre informatif. Les modèles, caractéristiques, couleurs et équipements peuvent changer sans préavis et varier selon le modèle. Aucune vente ne se fait en ligne : les prix, la disponibilité et les caractéristiques finales sont confirmés directement avec nous (par téléphone, par courriel ou lors d’un rendez-vous), et seul un contrat de vente signé engage Electrique Valley.',
                        en: 'The site’s content is provided for information only. Models, specifications, colours and equipment may change without notice and vary by model. Nothing is sold online: prices, availability and final specifications are confirmed directly with us (by phone, by email or at an appointment), and only a signed sales contract binds Electrique Valley.',
                    },
                    {
                        fr: 'Les photos et les couleurs sont présentées à titre indicatif; les couleurs réelles peuvent varier selon votre écran.',
                        en: 'Photos and colours are for illustration; actual colours may vary depending on your screen.',
                    },
                ],
            },
            {
                title: { fr: 'Propriété intellectuelle et marques', en: 'Intellectual property and trademarks' },
                paragraphs: [
                    {
                        fr: 'Les textes, la mise en page et le logo d’Electrique Valley lui appartiennent. Les photos et les noms de modèles des fabricants sont utilisés avec leur permission et demeurent la propriété de leurs titulaires. Vous ne pouvez pas les reproduire sans permission écrite.',
                        en: 'Electrique Valley owns the text, layout and logo of this site. Manufacturers’ photos and model names are used with their permission and remain the property of their owners. You may not reproduce them without written permission.',
                    },
                ],
            },
            {
                title: { fr: 'Liens vers d’autres sites', en: 'Links to other sites' },
                paragraphs: [
                    {
                        fr: 'Le site peut contenir des liens vers des sites externes, comme nos pages Facebook et Instagram. Electrique Valley n’est pas responsable de leur contenu ni de leurs pratiques.',
                        en: 'The site may link to external sites, such as our Facebook and Instagram pages. Electrique Valley is not responsible for their content or practices.',
                    },
                ],
            },
            {
                title: { fr: 'Responsabilité', en: 'Liability' },
                paragraphs: [
                    {
                        fr: 'Nous faisons de notre mieux pour que le site soit exact et accessible, mais il est offert tel quel. Dans la mesure permise par la loi, Electrique Valley n’est pas responsable des dommages indirects liés à son utilisation ou à une interruption.',
                        en: 'We do our best to keep the site accurate and available, but it is provided as is. To the extent permitted by law, Electrique Valley is not liable for indirect damages related to its use or to an interruption.',
                    },
                ],
            },
            {
                title: { fr: 'Renseignements personnels', en: 'Personal information' },
                paragraphs: [
                    {
                        fr: 'La façon dont nous traitons vos renseignements est décrite dans notre politique de confidentialité.',
                        en: 'How we handle your information is described in our privacy policy.',
                    },
                ],
            },
            {
                title: { fr: 'Droit applicable et modifications', en: 'Governing law and changes' },
                paragraphs: [
                    {
                        fr: 'Ces conditions sont régies par les lois du Québec et les lois du Canada qui s’y appliquent. Nous pouvons les modifier; la date de mise à jour est indiquée en haut de la page.',
                        en: 'These terms are governed by the laws of Quebec and the applicable laws of Canada. We may change them; the update date is shown at the top of the page.',
                    },
                ],
            },
        ],
    },
} as const;

// Tab title and Google description for each page (titles 60 characters or fewer, descriptions about 155),
// by page name (addresses are in config/routes.json)
export const pageMeta = {
    home: {
        title: {
            fr: 'Voiturettes de golf à Valleyfield | Electrique Valley',
            en: 'Electric Golf Carts in Valleyfield | Electrique Valley',
        },
        description: {
            // Elite hidden for now; the versions with Elite are kept below.
            // fr: 'Voiturettes de golf et véhicules utilitaires électriques à batterie lithium : séries D-MAX, Élite, Luxor, Classic et Thor. Essai routier sur rendez-vous.',
            // en: 'Lithium-powered electric golf carts and utility vehicles: D-MAX, Elite, Luxor, Classic and Thor series. Test rides by appointment.',
            fr: 'Voiturettes de golf et véhicules utilitaires électriques à batterie lithium : séries D-MAX, Luxor, Classic et Thor. Essai routier sur rendez-vous.',
            en: 'Lithium-powered electric golf carts and utility vehicles: D-MAX, Luxor, Classic and Thor series. Test rides by appointment.',
        },
    },
    dmax: {
        title: { fr: 'Série D-MAX : GT4, GT6, XT4 et XT6 4x4 | Electrique Valley', en: 'D-MAX Series: GT4, GT6, XT4 and XT6 4WD | Electrique Valley' },
        description: {
            fr: 'Voiturettes électriques D-MAX GT4, GT6, XT4 et XT6 : batterie lithium 48 V, écran CarPlay et Android Auto, 4x4 sur les XT. Couleurs et fiches techniques.',
            en: 'D-MAX GT4, GT6, XT4 and XT6 electric carts: 48 V lithium battery, CarPlay and Android Auto screen, 4WD on the XT models. Colours and specifications.',
        },
    },
    elite: {
        title: { fr: 'Série Élite | Electrique Valley', en: 'Elite Series | Electrique Valley' },
        description: {
            fr: 'Voiturettes électriques de la série Élite : modèles 4L, 2+2L, 4+2 et Mini, batterie lithium, écran tactile. Couleurs, équipements et fiches techniques.',
            en: 'Elite series electric carts: 4L, 2+2L, 4+2 and Mini models, lithium battery, touchscreen. Colours, equipment and specifications.',
        },
    },
    luxor: {
        title: { fr: 'Série Luxor | Electrique Valley', en: 'Luxor Series | Electrique Valley' },
        description: {
            fr: 'Voiturettes électriques de la série Luxor : batterie lithium, écran CarPlay et Android Auto, plusieurs modèles. Couleurs et fiches techniques.',
            en: 'Luxor series electric carts: lithium battery, CarPlay and Android Auto screen, several models. Colours and specifications.',
        },
    },
    classic: {
        title: { fr: 'Série Classic | Electrique Valley', en: 'Classic Series | Electrique Valley' },
        description: {
            fr: 'Voiturettes électriques de la série Classic : batterie lithium, caméra de recul, couleurs au choix. Caractéristiques et fiches techniques.',
            en: 'Classic series electric carts: lithium battery, backup camera, choice of colours. Features and specifications.',
        },
    },
    thor: {
        title: { fr: 'Thor, véhicule utilitaire électrique | Electrique Valley', en: 'Thor Series Electric Utility Vehicle | Electrique Valley' },
        description: {
            fr: 'Thor : véhicule utilitaire électrique avec boîte de chargement, batterie lithium et caméra de recul. Caractéristiques et fiche technique.',
            en: 'Thor: electric utility vehicle with cargo box, lithium battery and backup camera. Features and specifications.',
        },
    },
    contact: {
        title: { fr: 'Nous joindre et essai routier | Electrique Valley', en: 'Contact Us and Test Rides | Electrique Valley' },
        description: {
            fr: 'Écrivez-nous ou appelez au 450 747-1525 pour un essai routier, de l’information sur nos voiturettes électriques ou pour devenir revendeur.',
            en: 'Write to us or call 450 747-1525 for a test ride, information about our electric carts, or to become a dealer.',
        },
    },
    videos: {
        title: { fr: 'Vidéos | Electrique Valley', en: 'Videos | Electrique Valley' },
        description: {
            fr: 'Capsules vidéo sur nos voiturettes électriques : batterie lithium, entretien, accessoires, sécurité et conseils.',
            en: 'Video capsules about our electric carts: lithium battery, care, accessories, safety and tips.',
        },
    },
    privacy: {
        title: { fr: 'Politique de confidentialité | Electrique Valley', en: 'Privacy Policy | Electrique Valley' },
        description: {
            fr: 'Comment Electrique Valley recueille, utilise et protège vos renseignements personnels (Loi 25).',
            en: 'How Electrique Valley collects, uses and protects your personal information (Quebec Law 25).',
        },
    },
    unsubscribe: {
        title: { fr: 'Se désabonner | Electrique Valley', en: 'Unsubscribe | Electrique Valley' },
        description: { fr: 'Se désabonner de l’infolettre d’Electrique Valley.', en: 'Unsubscribe from the Electrique Valley newsletter.' },
    },
    terms: {
        title: { fr: 'Conditions d’utilisation | Electrique Valley', en: 'Terms of Use | Electrique Valley' },
        description: {
            fr: 'Conditions d’utilisation du site electriquevalley.com.',
            en: 'Terms of use of the electriquevalley.com website.',
        },
    },
} as const;
