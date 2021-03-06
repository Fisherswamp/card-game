import CardInstance from "../card/CardInstance";
import EventEmitter from "../../utility/EventEmitter";

export default abstract class Zone extends EventEmitter {
    private isPublic: boolean;
    private isShared: boolean;
    private isOrdered: boolean;
    private readonly name: ZoneName;
    private readonly cards: CardInstance[];

    /**
     * Creates a new Zone. Currently passes the list of cards by reference
     * @param isPublic Whether the zone is public (can be seen by anyone) or private (can only be seen by owner)
     * @param isShared Whether the zone is shared between all players or owned by a specific player
     * @param isOrdered Whether the zone order matters
     * @param cards List of cards in the zone
     */
    protected constructor(
        name: ZoneName,
        isPublic: boolean,
        isShared: boolean,
        isOrdered: boolean,
        cards?: Zone | CardInstance[],
    ) {
        super();
        this.name = name;
        this.isShared = isShared;
        this.isPublic = isPublic;
        this.isOrdered = isOrdered;
        if (cards) {
            if (cards instanceof Zone) {
                this.cards = cards.getCards();
            } else {
                this.cards = cards;
            }
        } else {
            this.cards = [];
        }
    }

    getCards = (): CardInstance[] => {
        return this.cards;
    };

    getSize = (): number => {
        return this.getCards().length;
    };

    addCard = (card: CardInstance): void => {
        this.cards.push(card);
    };

    removeCard = (cardId: string): CardInstance | null => {
        const cardIndex = this.cards.findIndex((card) => card.state.id == cardId);
        if (cardIndex != -1) {
            return this.cards.splice(cardIndex, 1)[0];
        }
        return null;
    };

    getCard = (cardId: string): CardInstance | null => {
        return this.cards.find((card) => card.state.id == cardId);
    };
}

export type ZoneName = "Battlefield" | "Exile" | "Graveyard" | "Hand" | "Library" | "Stack";
