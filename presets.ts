/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
export interface Preset {
    name: string;
    maleName?: string;
    femaleName?: string;
    prompt: string;
}

export interface PresetCategory {
    name: string;
    presets: Preset[];
}

export const CATEGORIES: PresetCategory[] = [
    {
        name: "Carrières",
        presets: [
            {
                name: "Corporate",
                prompt: "Transformez cette image en un portrait professionnel de type corporate. La personne doit porter une tenue d'affaires élégante, avec un arrière-plan de bureau moderne et lumineux. L'éclairage doit être flatteur et professionnel.",
            },
            {
                name: "Scientifique",
                prompt: "Créez un portrait de la personne en tant que scientifique dans un laboratoire de pointe. Incluez des éléments comme des éprouvettes, des microscopes ou des tableaux blancs complexes en arrière-plan.",
            },
            {
                name: "Chef Cuisinier",
                femaleName: "Cheffe Cuisinière",
                prompt: "Imaginez la personne en chef cuisinier dans une cuisine de restaurant gastronomique. La toque, le tablier blanc et un environnement de cuisine en acier inoxydable sont essentiels.",
            },
            {
                name: "Pilote d'Avion",
                prompt: "Générez une image de la personne en tant que pilote, dans le cockpit d'un avion de ligne. L'arrière-plan doit montrer le tableau de bord complexe et une vue du ciel.",
            },
             {
                name: "Pompier",
                femaleName: "Pompière",
                prompt: "Créez une image héroïque de la personne en uniforme de pompier, avec un camion de pompiers ou un bâtiment en arrière-plan. L'expression doit être courageuse et déterminée.",
            },
            {
                name: "Artiste Peintre",
                prompt: "Réalisez un portrait de la personne dans un atelier d'artiste, un pinceau à la main, avec des toiles et des pots de peinture autour. L'ambiance doit être créative et inspirée.",
            },
            {
                name: "Astronaute",
                prompt: "Représentez la personne en tant qu'astronaute flottant en apesanteur dans l'espace, avec la Terre visible à travers le hublot d'un vaisseau spatial.",
            },
            {
                name: "Médecin",
                prompt: "Créez un portrait rassurant de la personne en médecin, portant une blouse blanche et un stéthoscope, dans un cabinet médical moderne et accueillant.",
            },
        ],
    },
    {
        name: "Créatif & Fantaisie",
        presets: [
            {
                name: "Super-héros",
                femaleName: "Super-héroïne",
                prompt: "Imaginez la personne en super-héros. Créez un costume unique, une pose héroïque et un arrière-plan de ville en action. Le style doit être épique et puissant.",
            },
            {
                name: "Explorateur Spatial",
                femaleName: "Exploratrice Spatiale",
                prompt: "Transformez la personne en un explorateur spatial à bord d'un vaisseau ou sur une planète extraterrestre. La combinaison doit être détaillée et l'arrière-plan doit évoquer l'immensité de l'espace.",
            },
            {
                name: "Détective Film Noir",
                prompt: "Plongez la personne dans une ambiance de film noir des années 1940. Imperméable, chapeau fedora, rues sombres et pluvieuses, et un éclairage en clair-obscur sont de rigueur.",
            },
            {
                name: "Personnage de Jeu Vidéo",
                prompt: "Réinterprétez la personne comme le héros d'un jeu vidéo de fantasy. Armure stylisée, arme épique et un paysage fantastique en arrière-plan.",
            },
            {
                name: "Magicien",
                femaleName: "Magicienne",
                prompt: "Transformez la personne en un magicien ou une sorcière puissant(e), lançant un sortilège avec des effets de lumière magiques autour de ses mains.",
            },
            {
                name: "Chevaucheur de Dragon",
                femaleName: "Chevaucheuse de Dragon",
                prompt: "Créez une image épique de la personne volant sur le dos d'un dragon majestueux au-dessus de montagnes escarpées et de nuages.",
            },
            {
                name: "Inventeur Steampunk",
                femaleName: "Inventrice Steampunk",
                prompt: "Imaginez la personne en inventeur de l'époque victorienne, entouré de ses créations mécaniques à base de cuivre et d'engrenages, dans un atelier rempli de plans.",
            },
            {
                name: "Illusionniste Gnome",
                prompt: "Représentez la personne comme un gnome astucieux et plein d'esprit, spécialisé dans les sorts d'illusion, dans une forêt enchantée et lumineuse.",
            },
        ],
    },
    {
        name: "Époques Historiques",
        presets: [
            {
                name: "Égypte Antique",
                prompt: "Créez un portrait de la personne en tant que noble de l'Égypte antique. Vêtements en lin blanc, bijoux en or, coiffure d'époque et un arrière-plan de temple égyptien.",
            },
            {
                name: "Rome Antique",
                prompt: "Imaginez la personne en sénateur ou citoyenne romaine, drapée dans une toge, avec le Colisée ou le Forum romain en arrière-plan.",
            },
            {
                name: "Viking",
                prompt: "Transformez la personne en un guerrier ou une guerrière Viking, avec des tresses, une armure de cuir et de fourrure, et un fjord norvégien en arrière-plan.",
            },
            {
                name: "Années 1920 (Gatsby)",
                prompt: "Donnez à la personne un look des Années Folles. Pensez aux robes à franges, aux coiffures crantées, aux costumes élégants et à une ambiance de fête Art déco.",
            },
            {
                name: "Far West",
                prompt: "Créez un portrait de style western. Chapeau de cowboy, chemise à carreaux ou tenue de saloon, avec un paysage de désert ou une ville du Far West en fond.",
            },
            {
                name: "Samouraï",
                prompt: "Représentez la personne en samouraï du Japon féodal, portant une armure traditionnelle (yoroi) et un katana, dans un jardin de cerisiers en fleurs.",
            },
            {
                name: "Inventeur de la Renaissance",
                femaleName: "Inventrice de la Renaissance",
                prompt: "Imaginez la personne en tant qu'inventeur et artiste de la Renaissance, à la Léonard de Vinci, dans son atelier rempli de croquis, de maquettes et d'inventions.",
            },
            {
                name: "Chevalier Templier",
                femaleName: "Chevalière Templière",
                prompt: "Transformez la personne en un chevalier templier, avec le manteau blanc à la croix rouge, en armure, dans une forteresse médiévale en Terre Sainte.",
            },
        ],
    },
    {
        name: "Styles Artistiques",
        presets: [
            {
                name: "Peinture à l'Huile",
                prompt: "Transformez la photo en un portrait classique peint à l'huile, avec des coups de pinceau visibles et une texture riche, dans le style des maîtres de la Renaissance.",
            },
            {
                name: "Pop Art (Warhol)",
                prompt: "Créez une œuvre de Pop Art inspirée d'Andy Warhol. Utilisez des couleurs vives et contrastées, et un effet de sérigraphie.",
            },
            {
                name: "Aquarelle",
                prompt: "Transformez la photo en une peinture à l'aquarelle délicate et expressive. Les couleurs doivent être douces et les traits fluides.",
            },
            {
                name: "Néon & Cyberpunk",
                prompt: "Plongez la personne dans une ambiance néon et cyberpunk. Utilisez des lumières roses, bleues et violettes vives sur un fond urbain sombre pour créer un portrait futuriste et stylé.",
            },
            {
                name: "Dessin Animateur",
                prompt: "Convertissez le portrait en un personnage de dessin animé, avec des traits simplifiés, de grands yeux expressifs et des couleurs vives.",
            },
            {
                name: "Steampunk",
                prompt: "Réinterprétez le portrait dans un style steampunk. Ajoutez des engrenages, des lunettes de protection, des vêtements de l'époque victorienne et une ambiance industrielle du 19ème siècle.",
            },
            {
                name: "Cubisme",
                prompt: "Réinterprétez le portrait dans le style cubiste de Picasso, en déconstruisant le visage en formes géométriques et en le montrant sous plusieurs angles simultanément.",
            },
            {
                name: "Surréalisme (Dalí)",
                prompt: "Créez une image surréaliste inspirée de Salvador Dalí, où le portrait de la personne se fond dans un paysage onirique avec des objets fondus et des symboles étranges.",
            },
        ],
    },
    {
        name: "Sports & Fitness",
        presets: [
            {
                name: "Athlète Olympique",
                prompt: "Représentez la personne en tant qu'athlète olympique sur un podium, une médaille d'or autour du cou, avec un stade en arrière-plan.",
            },
            {
                name: "Alpiniste",
                prompt: "Créez une image de la personne en alpiniste au sommet d'une montagne enneigée, piolet à la main, avec un panorama spectaculaire.",
            },
            {
                name: "Surfeur",
                femaleName: "Surfeuse",
                prompt: "Imaginez la personne en surfeur, planche sous le bras, marchant sur une plage au coucher du soleil avec des vagues en arrière-plan.",
            },
            {
                name: "Yogi",
                femaleName: "Yogini",
                prompt: "Générez un portrait serein de la personne dans une posture de yoga complexe, dans un environnement paisible comme un jardin zen ou une plage.",
            },
            {
                name: "Joueur de Basket",
                femaleName: "Joueuse de Basket",
                prompt: "Transformez la personne en un joueur de basketball dynamique, en plein dunk, avec un maillot d'équipe et un terrain bondé en arrière-plan.",
            },
            {
                name: "Boxeur",
                femaleName: "Boxeuse",
                prompt: "Créez un portrait intense de la personne en tant que boxeur, gants aux poings, sur un ring sous les projecteurs, avec une expression de concentration ultime.",
            },
            {
                name: "Pilote de F1",
                prompt: "Imaginez la personne en pilote de Formule 1, casque à la main, à côté de sa voiture de course sur la grille de départ d'un circuit célèbre.",
            },
            {
                name: "Joueur de Tennis",
                femaleName: "Joueuse de Tennis",
                prompt: "Représentez la personne en joueur de tennis professionnel, en plein service sur un court en terre battue comme Roland-Garros, avec une tension palpable.",
            },
        ],
    },
    {
        name: "Musique & Danse",
        presets: [
            {
                name: "Rockstar",
                prompt: "Transformez la personne en une rockstar sur scène, guitare électrique à la main, sous les projecteurs, avec une foule en délire.",
            },
            {
                name: "DJ",
                prompt: "Créez un portrait de la personne en DJ, aux platines, dans un club avec des lumières stroboscopiques et une ambiance de fête.",
            },
            {
                name: "Danseur de Ballet",
                femaleName: "Danseuse de Ballet",
                prompt: "Représentez la personne en danseur ou danseuse de ballet, réalisant une figure élégante sur une scène de théâtre classique.",
            },
            {
                name: "Compositeur Classique",
                femaleName: "Compositrice Classique",
                prompt: "Représentez la personne en compositeur de l'ère classique, assis à un piano à queue, entouré de partitions, dans un salon opulent du 18ème siècle.",
            },
            {
                name: "Chanteur d'Opéra",
                femaleName: "Chanteuse d'Opéra",
                prompt: "Transformez la personne en un chanteur d'opéra dramatique sur la scène d'un opéra majestueux, en costume d'époque, en pleine performance passionnée.",
            },
            {
                name: "Danseur de Hip-Hop",
                femaleName: "Danseuse de Hip-Hop",
                prompt: "Créez une image de la personne en danseur de hip-hop, réalisant une figure de breakdance dans une ruelle urbaine colorée de graffitis.",
            },
            {
                name: "Musicien de Jazz",
                femaleName: "Musicienne de Jazz",
                prompt: "Imaginez la personne en musicien de jazz dans un club enfumé de la Nouvelle-Orléans, jouant du saxophone avec une expression pleine d'âme.",
            },
            {
                name: "Chanteur Folk",
                femaleName: "Chanteuse Folk",
                prompt: "Générez un portrait de la personne en chanteur folk, guitare acoustique à la main, chantant au coin d'un feu de camp sous un ciel étoilé.",
            },
        ],
    },
    {
        name: "Science-Fiction",
        presets: [
            {
                name: "Jedi",
                prompt: "Imaginez la personne en chevalier Jedi, brandissant un sabre laser, avec un vaisseau spatial ou un temple Jedi en arrière-plan.",
            },
            {
                name: "Pilote de Mecha",
                prompt: "Créez un portrait de la personne dans le cockpit d'un robot géant (mecha), avec une interface holographique et une vue sur un champ de bataille futuriste.",
            },
            {
                name: "Colon de Mars",
                femaleName: "Colonisatrice de Mars",
                prompt: "Transformez la personne en un des premiers colons de Mars, en combinaison spatiale, devant un biodôme avec le paysage rouge de la planète.",
            },
             {
                name: "Agent de Blade Runner",
                femaleName: "Agente de Blade Runner",
                prompt: "Générez un portrait inspiré de Blade Runner, en détective dans une ville futuriste pluvieuse, illuminée par des hologrammes publicitaires géants.",
            },
            {
                name: "Cyborg",
                prompt: "Intégrez des éléments cybernétiques high-tech au portrait de la personne, comme un œil bionique ou des circuits lumineux sous la peau, dans un style futuriste et épuré.",
            },
            {
                name: "Diplomate Extraterrestre",
                prompt: "Réinterprétez la personne comme un ambassadeur d'une race extraterrestre sage et élégante, avec des traits subtilement non humains, dans une salle de conseil galactique.",
            },
            {
                name: "Voyageur Temporel",
                femaleName: "Voyageuse Temporelle",
                prompt: "Créez un portrait de la personne émergeant d'un vortex temporel ou à côté d'une machine à remonter le temps complexe, avec des échos visuels de différentes époques.",
            },
            {
                name: "Survivant Post-Apo",
                femaleName: "Survivante Post-Apo",
                prompt: "Imaginez la personne en survivant dans un monde post-apocalyptique, avec des vêtements improvisés et un équipement de fortune, dans les ruines d'une ville envahie par la nature.",
            },
        ],
    },
    {
        name: "Aventure & Voyage",
        presets: [
            {
                name: "Explorateur de la Jungle",
                femaleName: "Exploratrice de la Jungle",
                prompt: "Créez une image de la personne en explorateur, machette à la main, dans une jungle dense et luxuriante avec des ruines anciennes en arrière-plan.",
            },
            {
                name: "Aventurier du Désert",
                femaleName: "Aventurière du Désert",
                prompt: "Imaginez la personne en aventurier dans le désert, style Indiana Jones, avec des dunes de sable à perte de vue et une pyramide au loin.",
            },
            {
                name: "Marin",
                femaleName: "Marine",
                prompt: "Transformez la personne en marin sur le pont d'un grand voilier en pleine mer, avec des voiles gonflées par le vent et un ciel orageux.",
            },
            {
                name: "Photographe Animalier",
                femaleName: "Photographe Animalière",
                prompt: "Représentez la personne en photographe animalier dans la savane africaine, avec un téléobjectif, observant un troupeau d'éléphants.",
            },
            {
                name: "Plongeur des Abysses",
                femaleName: "Plongeuse des Abysses",
                prompt: "Créez une image de la personne en plongeur sous-marin explorant une fosse océanique profonde, éclairant des créatures bioluminescentes avec une lampe torche.",
            },
            {
                name: "Chercheur Polaire",
                femaleName: "Chercheuse Polaire",
                prompt: "Imaginez la personne en scientifique dans l'Arctique, bien emmitouflée, devant une aurore boréale spectaculaire au-dessus d'une base de recherche isolée.",
            },
            {
                name: "Volcanologue",
                prompt: "Représentez la personne en volcanologue intrépide, portant une combinaison de protection thermique près d'une coulée de lave en fusion.",
            },
            {
                name: "Globetrotter",
                femaleName: "Globetrotteuse",
                prompt: "Générez un portrait de la personne avec un sac à dos, regardant une carte du monde, avec en arrière-plan un montage de plusieurs monuments célèbres.",
            },
        ],
    },
    {
        name: "Cuisine & Gastronomie",
        presets: [
            {
                name: "Pâtissier",
                femaleName: "Pâtissière",
                prompt: "Transformez la personne en maître pâtissier dans une boulangerie parisienne, saupoudrant de sucre glace une pâtisserie complexe et magnifique.",
            },
            {
                name: "Barista",
                prompt: "Imaginez la personne en barista expert, créant un latte art complexe dans un café branché et confortable.",
            },
            {
                name: "Sommelier",
                femaleName: "Sommelière",
                prompt: "Créez un portrait de la personne en sommelier, dégustant un verre de vin dans une cave à vin bien garnie avec des fûts de chêne.",
            },
            {
                name: "Maître Sushi",
                prompt: "Représentez la personne en maître sushi derrière un comptoir en bois de cyprès, préparant avec précision un nigiri.",
            },
            {
                name: "Gastronomie Moléculaire",
                prompt: "Créez une image de la personne en chef avant-gardiste, utilisant des techniques de gastronomie moléculaire avec de la fumée d'azote liquide et des sphères comestibles.",
            },
            {
                name: "Chocolatier",
                femaleName: "Chocolatière",
                prompt: "Représentez la personne en artisan chocolatier, tempérant du chocolat fondu sur une table en marbre dans son atelier gourmand.",
            },
            {
                name: "Chef de Food Truck",
                femaleName: "Cheffe de Food Truck",
                prompt: "Imaginez la personne en chef propriétaire d'un food truck populaire et créatif, servant des clients souriants dans une ambiance de festival urbain.",
            },
            {
                name: "Vigneron",
                femaleName: "Vigneronne",
                prompt: "Générez un portrait de la personne en vigneron dans son vignoble, examinant une grappe de raisin mûr avec le soleil couchant sur les collines en arrière-plan.",
            },
        ],
    },
    {
        name: "Mythologie & Légendes",
        presets: [
            {
                name: "Divinité Grecque",
                prompt: "Représentez la personne comme un dieu ou une déesse grecque (par exemple, Zeus, Athéna, Apollon) sur le Mont Olympe, avec des attributs divins et une architecture classique.",
            },
            {
                name: "Chevalier Arthurien",
                femaleName: "Chevalière Arthurienne",
                prompt: "Transformez la personne en un noble chevalier de la Table Ronde, en armure brillante, avec le château de Camelot en arrière-plan.",
            },
            {
                name: "Créature Marine",
                maleName: "Triton",
                femaleName: "Sirène",
                prompt: "Imaginez la personne comme une sirène ou un triton mystique dans un royaume sous-marin vibrant, entouré de coraux lumineux et de créatures marines.",
            },
            {
                name: "Elfe de la Forêt",
                prompt: "Créez un portrait de la personne en elfe élégant dans une forêt enchantée, avec des oreilles pointues, des vêtements naturels et une lumière douce filtrant à travers les arbres.",
            },
            {
                name: "Pharaon Tout-Puissant",
                femaleName: "Pharaonne Toute-Puissante",
                prompt: "Générez une image de la personne en tant que pharaon égyptien puissant, assis sur un trône orné de hiéroglyphes, portant la couronne et le sceptre.",
            },
            {
                name: "Centaure Archer",
                femaleName: "Centauresse Archère",
                prompt: "Représentez la personne comme un centaure sage et puissant, mi-humain mi-cheval, bandant son arc dans une ancienne forêt grecque.",
            },
            {
                name: "Dresseur de Griffon",
                femaleName: "Dresseuse de Griffon",
                prompt: "Imaginez la personne comme un dresseur de créatures fantastiques, debout à côté d'un griffon majestueux (mi-aigle, mi-lion) au sommet d'une falaise.",
            },
            {
                name: "Gardien d'Anubis",
                femaleName: "Gardienne d'Anubis",
                prompt: "Transformez la personne en un gardien de tombeau égyptien, avec des attributs du dieu Anubis à tête de chacal, veillant sur l'entrée d'une pyramide.",
            },
        ],
    },
    {
        name: "Culture Pop",
        presets: [
            {
                name: "Héros d'Action 80s",
                femaleName: "Héroïne d'Action 80s",
                prompt: "Créez une affiche de film d'action des années 80 avec la personne en héros musclé, avec des explosions et un coucher de soleil synthwave en arrière-plan.",
            },
            {
                name: "Star de Sitcom 90s",
                prompt: "Imaginez la personne comme un personnage d'une sitcom des années 90, avec une coiffure emblématique, des vêtements colorés et un décor de studio familier.",
            },
            {
                name: "Personnage de Ghibli",
                prompt: "Transformez la personne en un personnage du style d'animation du Studio Ghibli, dans un paysage pastoral et rêveur avec un ciel magnifique.",
            },
            {
                name: "Espion International",
                femaleName: "Espionne Internationale",
                prompt: "Représentez la personne en espion sophistiqué, en smoking ou robe de soirée, dans un casino de Monte-Carlo ou lors d'une poursuite en voiture exotique.",
            },
            {
                name: "Icône du Cinéma Muet",
                prompt: "Créez un portrait en noir et blanc de la personne en tant que star du cinéma muet, avec un maquillage dramatique et une expression exagérée.",
            },
            {
                name: "Protagoniste de Wes Anderson",
                prompt: "Placez la personne au centre d'une scène parfaitement symétrique et stylisée, avec une palette de couleurs pastel et une ambiance excentrique à la Wes Anderson.",
            },
            {
                name: "Réalisateur de Cinéma",
                femaleName: "Réalisatrice de Cinéma",
                prompt: "Imaginez la personne en réalisateur de cinéma, regardant à travers le viseur d'une caméra, sur un plateau de tournage en pleine effervescence.",
            },
            {
                name: "Artiste de Comic Book",
                prompt: "Transformez la photo en la couverture d'un comic book de l'âge d'argent, avec un style d'encrage audacieux, des couleurs en points de trame et des bulles de dialogue.",
            },
        ],
    },
    {
        name: "Métiers d'Art & Savoir-Faire",
        presets: [
            {
                name: "Horloger de précision",
                femaleName: "Horlogère de précision",
                prompt: "Représentez la personne en horloger, penché sur un établi complexe, assemblant une montre mécanique avec des loupes et des outils délicats.",
            },
            {
                name: "Souffleur de verre",
                femaleName: "Souffleuse de verre",
                prompt: "Créez une image de la personne en train de souffler du verre, façonnant une pièce en fusion au bout d'une canne dans un atelier chaud et lumineux.",
            },
            {
                name: "Luthier",
                femaleName: "Luthière",
                prompt: "Imaginez la personne dans son atelier de lutherie, sculptant le bois pour créer un violon ou une guitare, entourée de copeaux et d'outils spécialisés.",
            },
            {
                name: "Calligraphe",
                prompt: "Générez un portrait serein de la personne en maître calligraphe, traçant des caractères élégants avec un pinceau sur du papier de riz.",
            },
            {
                name: "Parfumeur",
                femaleName: "Parfumeuse",
                prompt: "Représentez la personne en 'nez' ou parfumeur, entouré de centaines de flacons d'essences, composant une nouvelle fragrance.",
            },
            {
                name: "Potier",
                femaleName: "Potière",
                prompt: "Créez un portrait de la personne en potier, les mains couvertes d'argile, façonnant un vase sur un tour de potier dans un atelier rustique.",
            },
            {
                name: "Tisserand",
                femaleName: "Tisserande",
                prompt: "Imaginez la personne travaillant sur un grand métier à tisser en bois, créant une tapisserie complexe avec des fils de toutes les couleurs.",
            },
            {
                name: "Forgeron",
                femaleName: "Forgeronne",
                prompt: "Représentez la personne en forgeron, martelant une pièce de métal incandescent sur une enclume, avec des étincelles qui volent dans la forge.",
            },
        ],
    },
    {
        name: "Horreur & Gothique",
        presets: [
            {
                name: "Vampire Victorien",
                femaleName: "Vampire Victorienne",
                prompt: "Transformez la personne en un vampire aristocratique et séduisant dans un château gothique, avec des vêtements d'époque et une atmosphère sombre.",
            },
            {
                name: "Savant Fou",
                femaleName: "Savante Folle",
                prompt: "Créez une image de la personne en savant fou dans un laboratoire de style Frankenstein, avec des éclairs, des bobines de Tesla et une lueur maniaque dans les yeux.",
            },
            {
                name: "Détective de l'occulte",
                prompt: "Imaginez la personne en détective du paranormal, dans une bibliothèque poussiéreuse remplie de livres anciens, une lanterne à la main.",
            },
            {
                name: "Gargouille de cathédrale",
                prompt: "Réinterprétez la personne comme une gargouille en pierre vivante, perchée au sommet d'une cathédrale gothique, observant la ville en contrebas.",
            },
            {
                name: "Chasseur de Fantômes",
                femaleName: "Chasseuse de Fantômes",
                prompt: "Représentez la personne en enquêteur paranormal, utilisant un équipement de détection de fantômes dans un manoir hanté et décrépit.",
            },
            {
                name: "Loup-Garou",
                femaleName: "Louve-Garou",
                prompt: "Créez une image de la transformation de la personne en loup-garou féroce sous la pleine lune, dans une forêt sombre et brumeuse.",
            },
            {
                name: "Survivant Zombie",
                femaleName: "Survivante Zombie",
                prompt: "Imaginez la personne comme un survivant endurci de l'apocalypse zombie, regardant avec méfiance par-dessus une barricade dans une ville en ruines.",
            },
            {
                name: "Adepte de Cthulhu",
                prompt: "Transformez la personne en un cultiste énigmatique dans un style lovecraftien, effectuant un rituel devant un monolithe ancien sous un ciel aux couleurs étranges.",
            },
        ],
    },
    {
        name: "Futurs Alternatifs",
        presets: [
            {
                name: "Citoyen d'Éco-cité",
                femaleName: "Citoyenne d'Éco-cité",
                prompt: "Représentez la personne dans une utopie verte et futuriste, une ville où l'architecture et la nature sont parfaitement intégrées.",
            },
            {
                name: "Pilote de Course Solaire",
                prompt: "Imaginez la personne en pilote de course de véhicules solaires futuristes, dans un désert avec des circuits lumineux.",
            },
            {
                name: "Archiviste de données neurales",
                prompt: "Créez un portrait de la personne dans une bibliothèque de souvenirs numériques, interagissant avec des interfaces holographiques de données.",
            },
            {
                name: "Bio-ingénieur en terraformation",
                femaleName: "Bio-ingénieure en terraformation",
                prompt: "Générez une image de la personne en bio-ingénieur sur une planète en cours de terraformation, analysant des plantes extraterrestres dans une serre géodésique.",
            },
            {
                name: "Artiste holographique",
                prompt: "Représentez la personne en train de sculpter une œuvre d'art faite de lumière pure dans un studio futuriste.",
            },
            {
                name: "Diplomate Intergalactique",
                prompt: "Transformez la personne en diplomate sur une station spatiale de l'ONU, négociant avec des délégués d'espèces extraterrestres diverses.",
            },
            {
                name: "Habitant de Cité Sous-Marine",
                femaleName: "Habitante de Cité Sous-Marine",
                prompt: "Imaginez la personne vivant dans une ville futuriste sous-marine, regardant par une fenêtre des créatures marines bioluminescentes et des véhicules aquatiques.",
            },
            {
                name: "Concepteur d'IA",
                femaleName: "Conceptrice d'IA",
                prompt: "Représentez la personne en tant que concepteur d'intelligences artificielles, collaborant avec une IA bienveillante représentée par une forme de lumière humanoïde.",
            },
        ],
    },
    {
        name: "Éléments & Nature",
        presets: [
            {
                name: "Esprit de la Forêt",
                prompt: "Fusionnez la personne avec la nature pour en faire un esprit de la forêt, avec des feuilles dans les cheveux, une peau semblable à de l'écorce et des animaux de la forêt autour.",
            },
            {
                name: "Gardien des Volcans",
                femaleName: "Gardienne des Volcans",
                prompt: "Imaginez la personne comme une incarnation du feu et de la terre, debout au bord d'un volcan en éruption, avec de la lave qui coule et une peau de roche en fusion.",
            },
            {
                name: "Souverain des Glaces",
                maleName: "Roi des Glaces",
                femaleName: "Reine des Glaces",
                prompt: "Transformez la personne en une reine majestueuse d'un royaume de glace, avec une couronne de cristaux de glace et un palais gelé.",
            },
            {
                name: "Nymphe Aquatique",
                prompt: "Créez un portrait éthéré de la personne en nymphe de l'eau, émergeant d'un étang couvert de nénuphars, avec des cheveux qui se fondent dans l'eau.",
            },
            {
                name: "Maître du Vent",
                femaleName: "Maîtresse du Vent",
                prompt: "Représentez la personne flottant dans le ciel, commandant les nuages et le vent, avec des vêtements qui flottent de manière spectaculaire.",
            },
            {
                name: "Esprit du Désert",
                prompt: "Imaginez la personne comme un esprit du désert, dont la forme est faite de sable tourbillonnant, sous un soleil de plomb avec des mirages à l'horizon.",
            },
            {
                name: "Géant de la Montagne",
                femaleName: "Géante de la Montagne",
                prompt: "Transformez la personne en un géant bienveillant fait de roche et de mousse, dormant parmi les sommets des montagnes comme s'il en faisait partie.",
            },
            {
                name: "Créature des Marais",
                prompt: "Réinterprétez la personne comme une créature mystérieuse des marais, entrelacée de lianes et de fleurs luminescentes, dans un bayou brumeux.",
            },
        ],
    },
    {
        name: "Micro-mondes",
        presets: [
            {
                name: "Explorateur de récif corallien (miniature)",
                prompt: "Imaginez la personne en tant qu'explorateur miniature naviguant à travers un récif corallien vibrant comme si c'était une immense forêt extraterrestre.",
            },
            {
                name: "Jardinier de bonsaï",
                femaleName: "Jardinière de bonsaï",
                prompt: "Créez une image de la personne à une échelle minuscule, vivant et s'occupant d'un bonsaï comme si c'était un arbre géant de la vie.",
            },
            {
                name: "Bibliothécaire de livres miniatures",
                prompt: "Représentez la personne dans une bibliothèque magique où les livres sont minuscules et volent comme des papillons.",
            },
            {
                name: "Fée des jardins",
                prompt: "Transformez la personne en une fée avec des ailes translucides, se reposant sur un pétale de fleur couvert de rosée dans un jardin ensoleillé.",
            },
            {
                name: "Pilote d'insecte mécanique",
                prompt: "Générez un portrait de la personne en pilote miniature chevauchant un insecte mécanique de style steampunk, comme une libellule ou un scarabée.",
            },
            {
                name: "Chevaucheur de fourmi",
                femaleName: "Chevaucheuse de fourmi",
                prompt: "Imaginez la personne, réduite à la taille d'une fourmi, chevauchant une fourmi soldat à travers le sol d'une forêt, qui ressemble à une jungle impénétrable.",
            },
            {
                name: "Collectionneur de pollen",
                femaleName: "Collectionneuse de pollen",
                prompt: "Représentez la personne comme une petite créature ailée, volant de fleur en fleur pour collecter du pollen doré dans des sacs minuscules.",
            },
            {
                name: "Marin de goutte de rosée",
                femaleName: "Marine de goutte de rosée",
                prompt: "Créez une image de la personne naviguant sur une feuille à l'intérieur d'une goutte de rosée, utilisant un pétale comme voile, dans un monde où l'eau a une tension de surface énorme.",
            },
        ],
    },
    {
        name: "Monde des Rêves & Abstrait",
        presets: [
            {
                name: "Paysage Onirique",
                prompt: "Fusionnez le portrait de la personne avec un paysage de rêve surréaliste où les montagnes flottent et les rivières sont faites d'étoiles liquides.",
            },
            {
                name: "Fractale Humaine",
                prompt: "Réinterprétez le portrait comme une fractale complexe et organique, où les traits du visage se répètent à l'infini dans des motifs mathématiques.",
            },
            {
                name: "Constellation Vivante",
                prompt: "Transformez la personne en une constellation dans le ciel nocturne, où les étoiles dessinent les contours de son visage et de son corps.",
            },
            {
                name: "Sculpture de Nuages",
                prompt: "Imaginez le visage de la personne sculpté dans des nuages cumulonimbus au coucher du soleil, avec des rayons de lumière qui le traversent.",
            },
            {
                name: "Portrait Kaléidoscopique",
                prompt: "Créez un portrait symétrique et coloré de la personne comme si elle était vue à travers un kaléidoscope, avec des motifs hypnotiques.",
            },
            {
                name: "Forêt de Néon",
                prompt: "Représentez la personne comme une entité lumineuse dans une forêt où les arbres et les plantes sont faits de tubes de néon colorés.",
            },
            {
                name: "Océan de Sable",
                prompt: "Imaginez la personne émergeant d'un océan de sable mouvant sous un ciel violet, où les dunes se comportent comme des vagues.",
            },
            {
                name: "Mélodie Cristalline",
                prompt: "Transformez la personne en une sculpture de cristal qui semble vibrer, visualisant une mélodie sous forme de formes et de couleurs.",
            },
        ],
    },
    {
        name: "Rôles & Personnalités",
        presets: [
            {
                name: "Le Sage",
                femaleName: "La Sage",
                prompt: "Représentez la personne comme un archétype de sage, avec des yeux profonds et bienveillants, dans une bibliothèque ancienne ou au sommet d'une montagne isolée.",
            },
            {
                name: "Le Rebelle",
                femaleName: "La Rebelle",
                prompt: "Transformez la personne en une figure rebelle et charismatique, avec une veste en cuir, devant un mur de briques, défiant l'autorité du regard.",
            },
            {
                name: "Le Guérisseur",
                femaleName: "La Guérisseuse",
                prompt: "Imaginez la personne en tant que guérisseur ou apothicaire, entouré de plantes médicinales et de potions lumineuses dans une cabane confortable.",
            },
            {
                name: "L'Inventeur Excentrique",
                femaleName: "L'Inventrice Excentrique",
                prompt: "Créez un portrait de la personne en inventeur loufoque, avec des cheveux en bataille et des lunettes de protection, au milieu d'une invention à moitié terminée et fumante.",
            },
            {
                name: "Le Gardien Silencieux",
                femaleName: "La Gardienne Silencieuse",
                prompt: "Représentez la personne comme un gardien stoïque et silencieux, veillant sur un lieu sacré comme une forêt ancienne ou une porte mystérieuse.",
            },
            {
                name: "Le Farceur",
                femaleName: "La Farceuse",
                prompt: "Transformez la personne en un personnage espiègle et farceur, comme un bouffon de cour ou un esprit de la malice, avec un sourire malin.",
            },
            {
                name: "Le Diplomate",
                femaleName: "La Diplomate",
                prompt: "Générez un portrait de la personne en diplomate élégant et posé, négociant une paix importante à une table de conseil futuriste ou historique.",
            },
            {
                name: "Le Nomade",
                femaleName: "La Nomade",
                prompt: "Imaginez la personne comme un voyageur nomade, avec des vêtements usés par les voyages, traversant un paysage vaste et sauvage, le regard tourné vers l'horizon.",
            },
        ],
    },
];