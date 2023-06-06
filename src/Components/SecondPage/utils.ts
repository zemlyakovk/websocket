export const validationPercent:(num: number) => boolean = (num) => {
    return 100 < num || num < 0;
};
