import { tag } from './Tag'

export type image = {
    id: string,
	subtitle: string,
	author: string,
	date?: Date,
	file: string,
	tags?: tag[],
	collection: string
}

export type createImageInputDTO = {
	subtitle: string,
	author: string,
	file: string,
	tags: string[],
	collection: string,
	date: Date
}