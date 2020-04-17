package cs319.cards.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HTMLController {

    @RequestMapping(value = {"/", "/about", "/hostview", "/join", "/selectView", "/czarView"})
    public String index() {
        return "index.html";
    }
}
