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
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Barley, 
        new Map([
            [Languages.English, "Barley"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.BrazilNuts, 
        new Map([
            [Languages.English, "BrazilNuts"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Cashew, 
        new Map([
            [Languages.English, "Cashew"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Celery, 
        new Map([
            [Languages.English, "Celery"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Crustaceans, 
        new Map([
            [Languages.English, "Crustaceans"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Eggs, 
        new Map([
            [Languages.English, "Eggs"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Fish, 
        new Map([
            [Languages.English, "Fish"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Hazelnuts, 
        new Map([
            [Languages.English, "Hazelnuts"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Legumes, 
        new Map([
            [Languages.English, "Legumes"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Lupin, 
        new Map([
            [Languages.English, "Lupin"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Macadamia, 
        new Map([
            [Languages.English, "Macadamia"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Milk, 
        new Map([
            [Languages.English, "Milk"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Molluscs, 
        new Map([
            [Languages.English, "Molluscs"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Mustard, 
        new Map([
            [Languages.English, "Mustard"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.None, 
        new Map([
            [Languages.English, "None"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Oats, 
        new Map([
            [Languages.English, "Oats"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Pecans, 
        new Map([
            [Languages.English, "Pecans"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Pistachio, 
        new Map([
            [Languages.English, "Pistachio"],
            [Languages.Italian, "testy"]
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
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Sesame, 
        new Map([
            [Languages.English, "Sesame"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Soya, 
        new Map([
            [Languages.English, "Soya"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.SulphurDioxide, 
        new Map([
            [Languages.English, "SulphurDioxide"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Walnuts, 
        new Map([
            [Languages.English, "Walnuts"],
            [Languages.Italian, "testy"]
        ]
    )],
    [Allergen.Wheat, 
        new Map([
            [Languages.English, "Wheat"],
            [Languages.Italian, "testy"]
        ]
    )],
])
