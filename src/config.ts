export type ConfigType = {
    logDir: string;
    isStoreInFile: boolean;
};

const CONFIG: ConfigType = {
    logDir: ".logs",
    isStoreInFile: true,
};

export default CONFIG;
