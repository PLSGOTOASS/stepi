package todoList.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
@AllArgsConstructor
@Data
public class LoginAndPassword {
    private String login;
    private String password;
}
