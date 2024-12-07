
export const appPathDevelopment = "http://localhost:8080";
export const appPathProduction = "/CampaignManager";

export const appPath = process.env.NODE_ENV === 'production'
    ? appPathProduction : appPathDevelopment;

export const basename = "/CampaignManager";

