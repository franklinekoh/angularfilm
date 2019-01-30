export class Createfilm {
    constructor(
        public photo: any = null,
        public description: string = '',
        public ticket: number = null,
        public rating: number = null,
        public country: string = '',
        public genre: string = '',
        public filmName: string = '',
        public slug: string = '',
        public releaseDate: string = ''
    ){}
}
