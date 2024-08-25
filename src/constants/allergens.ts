import { Languages } from "./supportedLanguages";

export enum Allergen
{
    None ="None",
    Wheat ="Wheat",
    Barley ="Barley",
    Rye ="Rye",
    Oats ="Oats",
    Almonds ="Almonds",
    Hazelnuts ="Hazelnuts",
    Walnuts ="Walnuts",
    Pecans ="Pecans",
    BrazilNuts ="BrazilNuts",
    Pistachio ="Pistachio",
    Cashew ="Cashew",
    Macadamia ="Macadamia",
    QueenslandNut ="QueenslandNut",
    Milk ="Milk",
    Eggs ="Eggs",
    Soya ="Soya",
    Crustaceans ="Crustaceans",
    Fish ="Fish",
    Celery ="Celery",
    Mustard ="Mustard",
    Sesame ="Sesame",
    SulphurDioxide ="SulphurDioxide",
    Lupin ="Lupin",
    Legumes ="Legumes",
    Molluscs ="Molluscs",
}

export const allergenMap = new Map([
    [Allergen.Almonds, 
        new Map([
            [Languages.English, "Almonds"],
            [Languages.Italian, "Mandorle"]
        ]
    )],
    [Allergen.Barley, 
        new Map([
            [Languages.English, "Barley"],
            [Languages.Italian, "Orzo"]
        ]
    )],
    [Allergen.BrazilNuts, 
        new Map([
            [Languages.English, "BrazilNuts"],
            [Languages.Italian, "Noci Brasiliane"]
        ]
    )],
    [Allergen.Cashew, 
        new Map([
            [Languages.English, "Cashew"],
            [Languages.Italian, "Anacardi"]
        ]
    )],
    [Allergen.Celery, 
        new Map([
            [Languages.English, "Celery"],
            [Languages.Italian, "Sedano"]
        ]
    )],
    [Allergen.Crustaceans, 
        new Map([
            [Languages.English, "Crustaceans"],
            [Languages.Italian, "Crostacei"]
        ]
    )],
    [Allergen.Eggs, 
        new Map([
            [Languages.English, "Eggs"],
            [Languages.Italian, "Uovo"]
        ]
    )],
    [Allergen.Fish, 
        new Map([
            [Languages.English, "Fish"],
            [Languages.Italian, "Pesce"]
        ]
    )],
    [Allergen.Hazelnuts, 
        new Map([
            [Languages.English, "Hazelnuts"],
            [Languages.Italian, "Nocciole"]
        ]
    )],
    [Allergen.Legumes, 
        new Map([
            [Languages.English, "Legumes"],
            [Languages.Italian, "Legumi"]
        ]
    )],
    [Allergen.Lupin, 
        new Map([
            [Languages.English, "Lupin"],
            [Languages.Italian, "Lupini"]
        ]
    )],
    [Allergen.Macadamia, 
        new Map([
            [Languages.English, "Macadamia"],
            [Languages.Italian, "Noci Macadamia"]
        ]
    )],
    [Allergen.Milk, 
        new Map([
            [Languages.English, "Milk"],
            [Languages.Italian, "Latte"]
        ]
    )],
    [Allergen.Molluscs, 
        new Map([
            [Languages.English, "Molluscs"],
            [Languages.Italian, "Molluschi"]
        ]
    )],
    [Allergen.Mustard, 
        new Map([
            [Languages.English, "Mustard"],
            [Languages.Italian, "Senape"]
        ]
    )],
    [Allergen.None, 
        new Map([
            [Languages.English, "None"],
            [Languages.Italian, "Nessuna"]
        ]
    )],
    [Allergen.Oats, 
        new Map([
            [Languages.English, "Oats"],
            [Languages.Italian, "Avena"]
        ]
    )],
    [Allergen.Pecans, 
        new Map([
            [Languages.English, "Pecans"],
            [Languages.Italian, "Noci Pecan"]
        ]
    )],
    [Allergen.Pistachio, 
        new Map([
            [Languages.English, "Pistachio"],
            [Languages.Italian, "Pistacchio"]
        ]
    )],
    [Allergen.QueenslandNut, 
        new Map([
            [Languages.English, "QueenslandNut"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Rye, 
        new Map([
            [Languages.English, "Rye"],
            [Languages.Italian, "Segale"]
        ]
    )],
    [Allergen.Sesame, 
        new Map([
            [Languages.English, "Sesame"],
            [Languages.Italian, "Sesamo"]
        ]
    )],
    [Allergen.Soya, 
        new Map([
            [Languages.English, "Soya"],
            [Languages.Italian, "Soia"]
        ]
    )],
    [Allergen.SulphurDioxide, 
        new Map([
            [Languages.English, "SulphurDioxide"],
            [Languages.Italian, "Solfiti"]
        ]
    )],
    [Allergen.Walnuts, 
        new Map([
            [Languages.English, "Walnuts"],
            [Languages.Italian, "Noci"]
        ]
    )],
    [Allergen.Wheat, 
        new Map([
            [Languages.English, "Wheat"],
            [Languages.Italian, "Grano"]
        ]
    )],
])
