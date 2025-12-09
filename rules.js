// rules.js
export const rgaaRules = [
    {
        "id": "1",
        "titre": "Images",
        "criteres": [
            {
                "id": "1.1",
                "titre": "Chaque image porteuse d’information a-t-elle une alternative textuelle ? Critère 1.1",
                "tests": [{ "id": "1.1.1", "titre": "(A)" }]
            },
            {
                "id": "1.2",
                "titre": "Chaque image de décoration est-elle correctement ignorée par les technologies d’assistance ? Critère 1.2",
                "tests": [{ "id": "1.2.4", "titre": "s'appliquera également à l'élément <svg>..." }]
            },
            { "id": "1.3", "titre": "Alternative pertinente ?", "tests": [] },
            { "id": "1.4", "titre": "Image CAPTCHA", "tests": [] },
            { "id": "1.5", "titre": "Alternative CAPTCHA", "tests": [] },
            { "id": "1.6", "titre": "Description détaillée", "tests": [{ "id": "1.6.1", "titre": "..." }] },
            { "id": "1.7", "titre": "Pertinence description détaillée", "tests": [] },
            { "id": "1.8", "titre": "Image texte remplacée", "tests": [] },
            { "id": "1.9", "titre": "Légende d'image reliée", "tests": [] }
        ]
    },
    {
        "id": "2",
        "titre": "Cadres",
        "criteres": [
            { "id": "2.1", "titre": "Chaque cadre a-t-il un titre de cadre ?", "tests": [] },
            { "id": "2.2", "titre": "Pertinence titre cadre", "tests": [] }
        ]
    },
    {
        "id": "3",
        "titre": "Couleurs",
        "criteres": [
            { "id": "3.1", "titre": "Information par la couleur", "tests": [] },
            { "id": "3.2", "titre": "Contraste texte/fond suffisant", "tests": [] },
            { "id": "3.3", "titre": "Contraste composants interface", "tests": [] }
        ]
    },
    {
        "id": "4",
        "titre": "Multimédia",
        "criteres": [
            { "id": "4.1", "titre": "Transcription média temporel", "tests": [] },
            { "id": "4.2", "titre": "Pertinence transcription", "tests": [] },
            { "id": "4.3", "titre": "Sous-titres synchronisés", "tests": [] },
            { "id": "4.4", "titre": "Pertinence sous-titres", "tests": [] },
            { "id": "4.5", "titre": "Audiodescription", "tests": [] },
            { "id": "4.6", "titre": "Pertinence audiodescription", "tests": [] },
            { "id": "4.7", "titre": "Identification média", "tests": [] },
            { "id": "4.8", "titre": "Alternative média non temporel", "tests": [] },
            { "id": "4.9", "titre": "Pertinence alternative", "tests": [] },
            { "id": "4.10", "titre": "Contrôle son automatique", "tests": [] },
            { "id": "4.11", "titre": "Contrôle clavier média temporel", "tests": [] },
            { "id": "4.12", "titre": "Contrôle clavier média non temporel", "tests": [] },
            { "id": "4.13", "titre": "Compatibilité technologies assistance", "tests": [] }
        ]
    },
    {
        "id": "5",
        "titre": "Tableaux",
        "criteres": [
            { "id": "5.1", "titre": "Résumé tableau complexe", "tests": [] },
            { "id": "5.2", "titre": "Pertinence résumé", "tests": [] },
            { "id": "5.3", "titre": "Linéarisation tableau mise en forme", "tests": [] },
            { "id": "5.4", "titre": "Association titre tableau", "tests": [] },
            { "id": "5.5", "titre": "Pertinence titre", "tests": [] },
            { "id": "5.6", "titre": "Déclaration en-têtes", "tests": [] },
            { "id": "5.7", "titre": "Association cellules/en-têtes", "tests": [] },
            { "id": "5.8", "titre": "Pas d'éléments de données pour mise en forme", "tests": [] }
        ]
    },
    {
        "id": "6",
        "titre": "Liens",
        "criteres": [
            { "id": "6.1", "titre": "Lien explicite", "tests": [{ "id": "6.1.3", "titre": "..." }, { "id": "6.1.5", "titre": "..." }] },
            { "id": "6.2", "titre": "Intitulé de lien", "tests": [] }
        ]
    },
    {
        "id": "7",
        "titre": "Scripts",
        "criteres": [
            { "id": "7.1", "titre": "Compatibilité scripts", "tests": [{ "id": "7.1.3", "titre": "..." }] },
            { "id": "7.2", "titre": "Alternative script", "tests": [] },
            { "id": "7.3", "titre": "Contrôle clavier script", "tests": [] },
            { "id": "7.4", "titre": "Changement de contexte averti", "tests": [] },
            { "id": "7.5", "titre": "Messages de statut restitués", "tests": [] }
        ]
    },
    {
        "id": "8",
        "titre": "Éléments obligatoires",
        "criteres": [
            { "id": "8.1", "titre": "Doctype défini", "tests": [] },
            { "id": "8.2", "titre": "Code source valide", "tests": [] },
            { "id": "8.3", "titre": "Langue par défaut", "tests": [] },
            { "id": "8.4", "titre": "Pertinence code langue", "tests": [] },
            { "id": "8.5", "titre": "Titre de page", "tests": [] },
            { "id": "8.6", "titre": "Pertinence titre page", "tests": [] },
            { "id": "8.7", "titre": "Changement de langue signalé", "tests": [] },
            { "id": "8.8", "titre": "Code langue changement valide", "tests": [] },
            { "id": "8.9", "titre": "Balises pas uniquement pour présentation", "tests": [] },
            { "id": "8.10", "titre": "Changement sens lecture signalé", "tests": [] }
        ]
    },
    {
        "id": "9",
        "titre": "Structuration de l’information",
        "criteres": [
            { "id": "9.1", "titre": "Hiérarchie de titres", "tests": [] },
            { "id": "9.2", "titre": "Structure cohérente", "tests": [] },
            { "id": "9.3", "titre": "Structure listes", "tests": [] },
            { "id": "9.4", "titre": "Citation indiquée", "tests": [] }
        ]
    },
    {
        "id": "10",
        "titre": "Présentation de l’information",
        "criteres": [
            { "id": "10.1", "titre": "Feuilles de styles utilisées", "tests": [] },
            { "id": "10.2", "titre": "Contenu visible sans CSS", "tests": [] },
            { "id": "10.3", "titre": "Compréhensible sans CSS", "tests": [] },
            { "id": "10.4", "titre": "Zoom texte 200%", "tests": [] },
            { "id": "10.5", "titre": "Déclarations CSS couleurs", "tests": [] },
            { "id": "10.6", "titre": "Lien non évident visible", "tests": [] },
            { "id": "10.7", "titre": "Prise de focus visible", "tests": [] },
            { "id": "10.8", "titre": "Contenus cachés ignorés", "tests": [] },
            { "id": "10.9", "titre": "Info pas uniquement par forme/taille/pos", "tests": [] },
            { "id": "10.10", "titre": "Pertinence forme/taille/pos", "tests": [] },
            { "id": "10.11", "titre": "Contenu sans défilement excessif", "tests": [] },
            { "id": "10.12", "titre": "Espacement texte redéfinissable", "tests": [] },
            { "id": "10.13", "titre": "Contenus additionnels contrôlables", "tests": [{ "id": "10.13.1", "titre": "..." }] },
            { "id": "10.14", "titre": "Contenus CSS visibles clavier", "tests": [] }
        ]
    },
    {
        "id": "11",
        "titre": "Formulaires",
        "criteres": [
            { "id": "11.1", "titre": "Étiquette champ formulaire", "tests": [] },
            { "id": "11.2", "titre": "Pertinence étiquette", "tests": [{ "id": "11.2.5", "titre": "..." }] },
            { "id": "11.3", "titre": "Cohérence étiquettes répétées", "tests": [] },
            { "id": "11.4", "titre": "Étiquette et champ accolés", "tests": [{ "id": "11.4.2", "titre": "..." }] },
            { "id": "11.5", "titre": "Regroupement champs même nature", "tests": [] },
            { "id": "11.6", "titre": "Légende regroupement", "tests": [] },
            { "id": "11.7", "titre": "Pertinence légende", "tests": [] },
            { "id": "11.8", "titre": "Regroupement liste choix", "tests": [] },
            { "id": "11.9", "titre": "Pertinence bouton", "tests": [] },
            { "id": "11.10", "titre": "Contrôle saisie pertinent", "tests": [{ "id": "11.10.1", "titre": "..." }] },
            { "id": "11.11", "titre": "Suggestions erreurs saisie", "tests": [] },
            { "id": "11.12", "titre": "Modification/récupération données sensibles", "tests": [] },
            { "id": "11.13", "titre": "Finalité champ (autocomplete)", "tests": [] }
        ]
    },
    {
        "id": "12",
        "titre": "Navigation",
        "criteres": [
            { "id": "12.1", "titre": "Deux systèmes navigation", "tests": [] },
            { "id": "12.2", "titre": "Menu/Barres navigation fixes", "tests": [] },
            { "id": "12.3", "titre": "Plan du site pertinent", "tests": [] },
            { "id": "12.4", "titre": "Accès plan du site identique", "tests": [] },
            { "id": "12.5", "titre": "Accès moteur recherche identique", "tests": [] },
            { "id": "12.6", "titre": "Accès/évitement zones regroupement", "tests": [] },
            { "id": "12.7", "titre": "Lien évitement contenu", "tests": [] },
            { "id": "12.8", "titre": "Ordre tabulation cohérent", "tests": [] },
            { "id": "12.9", "titre": "Pas de piège au clavier", "tests": [] },
            { "id": "12.10", "titre": "Raccourcis clavier une touche", "tests": [] },
            { "id": "12.11", "titre": "Contenus survol atteignables clavier", "tests": [] }
        ]
    },
    {
        "id": "13",
        "titre": "Consultation",
        "criteres": [
            { "id": "13.1", "titre": "Contrôle limite temps", "tests": [] },
            { "id": "13.2", "titre": "Nouvelle fenêtre sur action", "tests": [] },
            { "id": "13.3", "titre": "Version accessible doc bureautique", "tests": [] },
            { "id": "13.4", "titre": "Même info version accessible", "tests": [] },
            { "id": "13.5", "titre": "Alternative contenu cryptique", "tests": [] },
            { "id": "13.6", "titre": "Pertinence alternative cryptique", "tests": [] },
            { "id": "13.7", "titre": "Changements luminosité/flashs", "tests": [] },
            { "id": "13.8", "titre": "Contenu mouvement contrôlable", "tests": [] },
            { "id": "13.9", "titre": "Orientation écran indifférente", "tests": [] },
            { "id": "13.10", "titre": "Geste complexe alternative simple", "tests": [] },
            { "id": "13.11", "titre": "Annulation action point unique", "tests": [] },
            { "id": "13.12", "titre": "Alternative mouvement appareil", "tests": [] }
        ]
    }
];