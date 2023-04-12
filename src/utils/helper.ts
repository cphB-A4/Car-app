export function kWToHP(kilowatts: number): number {
    const hp = kilowatts / 0.738;
    return Math.round(hp);
}

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}-${year}`;
}
