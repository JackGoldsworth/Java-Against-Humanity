package cs319.cards;

import cs319.cards.model.Party;

import java.util.ArrayList;
import java.util.List;

public class PartyManager {

    public static List<Party> parties = new ArrayList<>();

    public static Party getPartyByUsername(String userName) {
        return parties.stream().filter(party -> party.getHostname().equals(userName)).findFirst().orElseThrow(NullPointerException::new);
    }

    public static Party getPartyById(String id) {
        return parties.stream().filter(party -> party.getPartyId().equals(id)).findFirst().orElseThrow(NullPointerException::new);
    }
}
