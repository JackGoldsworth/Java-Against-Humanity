package cs319.cards.model;

import java.util.List;
import java.util.Objects;

public class AnswerCard implements Card {

    private final short cardId;
    private final String cardMessage;
    private final int cardPack;

    public AnswerCard(short cardId, String cardMessage, int cardPack) {
        this.cardId = cardId;
        this.cardMessage = cardMessage;
        this.cardPack = cardPack;
    }

    public short getCardId() {
        return cardId;
    }

    public String getCardMessage() {
        return cardMessage;
    }

    public int getCardPack() {
        return cardPack;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AnswerCard answerCard = (AnswerCard) o;
        return cardId == answerCard.cardId && Objects.equals(cardMessage, answerCard.cardMessage);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cardId, cardMessage);
    }

    public class AnswerDeck {

        private final List<AnswerCard> cards;

        public AnswerDeck(List<AnswerCard> cards) {
            this.cards = cards;
        }

        public List<AnswerCard> getAnswerCards() {
            return cards;
        }
    }

}
