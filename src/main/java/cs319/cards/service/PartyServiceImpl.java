package cs319.cards.service;

import cs319.cards.PartyManager;
import cs319.cards.model.Party;
import cs319.cards.model.User;
import cs319.cards.model.form.JoinForm;
import javafx.util.Pair;

import java.util.List;
import java.util.Optional;

public class PartyServiceImpl implements PartyService {

    @Override
    public Pair<Party, Boolean> createParty(String username, List<Integer> cardPacks, int maxPlayers, int scoreToWin) {
        Optional<Party> optionalParty = PartyManager.getPartyByUsername(username);
        if (!optionalParty.isPresent()) {
            Party party = new Party(username, cardPacks, maxPlayers, scoreToWin);
            PartyManager.parties.add(party);
            return new Pair<>(party, true);
        }
        return new Pair<>(null, false);
    }

    @Override
    public Pair<Party, User> joinParty(JoinForm joinForm) {
        Optional<Party> optionalParty = PartyManager.getPartyById(joinForm.getId());
        if (optionalParty.isPresent()) {
            User user = new User(joinForm.getUsername());
            optionalParty.get().addUser(user);
            return new Pair<>(optionalParty.get(), user);
        }
        return new Pair<>(null, null);
    }
}
