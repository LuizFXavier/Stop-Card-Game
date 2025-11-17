import type { Card } from "@/domain/entities/Card"

export {}

declare global {

    type GameRules = [string, number][]

    type Players = {id: number, name: string}[]

}