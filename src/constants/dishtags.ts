import { Languages } from "./supportedLanguages";

export enum DishTags
{
    None = "None",
    Meat = "Meat",
    Fish = "Fish",
    Dairy = "Dairy",
    Chicken = "Chicken",
    Vegan = "Vegan",
    Dinner = "Dinner",
    Dessert = "Dessert",
    Vegetarian = "Vegetarian"
}

export const dishMap = new Map([
    [DishTags.Chicken, 
        new Map([
            [Languages.English, "Chicken"],
            [Languages.Italian, "testy"]
        ]
    )],
    [DishTags.Dairy, 
        new Map([
            [Languages.English, "Dairy"],
            [Languages.Italian, "testy"]
        ]
    )],
    [DishTags.Dessert, 
        new Map([
            [Languages.English, "Dessert"],
            [Languages.Italian, "testy"]
        ]
    )],
    [DishTags.Dinner, 
        new Map([
            [Languages.English, "Dinner"],
            [Languages.Italian, "testy"]
        ]
    )],
    [DishTags.Fish, 
        new Map([
            [Languages.English, "Fish"],
            [Languages.Italian, "testy"]
        ]
    )],
    [DishTags.Meat, 
        new Map([
            [Languages.English, "Meat"],
            [Languages.Italian, "testy"]
        ]
    )],
    [DishTags.None, 
        new Map([
            [Languages.English, "None"],
            [Languages.Italian, "testy"]
        ]
    )],
    [DishTags.Vegan, 
        new Map([
            [Languages.English, "Vegan"],
            [Languages.Italian, "testy"]
        ]
    )],
    [DishTags.Vegetarian, 
        new Map([
            [Languages.English, "Vegetarian"],
            [Languages.Italian, "testy"]
        ]
    )],
]);