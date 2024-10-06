
export interface IWedding {
    id: number,
    primaryColor: string,
    secoundaryColor: string
    backgroundImage: string
    primaryFontColor: string | undefined
    secoundaryFontColor: string | undefined
    bodyFont: string | undefined
    headingFont: string | undefined
    picture: string
    title: string
    description: string,
    dresscode: string,
    language: string
    isDefaultLanguage: boolean,
    defaultLanguage: string,
    RSVPBody : string
}
