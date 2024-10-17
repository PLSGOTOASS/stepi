package todoList.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import todoList.exception.LoginException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TodoService {
    private final Map<String, String> passwordByLogin = new HashMap<>();
    private final Map<String, List<String>> todoByLogin = new HashMap<>();

    private final String loginExcMessage = "Invalid login or password";
    private final String signupExcMessage = "Such login already taken, choose another one";

    public void register(String login, String password) {
        if (!isLoginExist(login)) {
            passwordByLogin.put(login, password);
        }
        else {
            throw new LoginException(signupExcMessage);
        }
    }

    public ResponseEntity<Map<String, Object>> login(String login, String password) {
        if (validateEnter(login, password)) {
            List<String> todos = todoByLogin.get(login);
            if (todos == null) {
                todos = new ArrayList<>();
            }

            Map<String, Object> body = new HashMap<>();

            body.put("login", login);
            body.put("todos", todos);

            ResponseEntity<Map<String, Object>> response = new ResponseEntity<>(body, HttpStatus.OK);
            return response;
        }
        throw new LoginException(loginExcMessage);
    }

    public ResponseEntity<List<String>> getUserTodos(String login) {
        List<String> todos = todoByLogin.get(login);
        if (todos == null) {
            todos = new ArrayList<>();
        }
        todos.forEach(System.out::println);
        Map<String, Object> body = new HashMap<>();
        body.put("todos", todos);

        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

    public ResponseEntity<Map<String, Object>> addTodo(String login,String todo) {
        todoByLogin.putIfAbsent(login, new ArrayList<>());
        todoByLogin.get(login).add(todo);
        Map<String, Object> body = new HashMap<>();
        body.put("todo", todo);
        ResponseEntity<Map<String, Object>> response = new ResponseEntity<>(body, HttpStatus.OK);
        return response;
    }

    public ResponseEntity<Map<String, Object>> deleteToDo(String login, String todo) {
        todoByLogin.get(login).remove(todo);
        Map<String, Object> body = new HashMap<>();
        body.put("todo", todo);
        ResponseEntity<Map<String, Object>> response = new ResponseEntity<>(body, HttpStatus.OK);
        return response;
    }

    public ResponseEntity<Map<String, Object>> updateTodo(String login, String todo, String newTodo) {
        List<String> todos = todoByLogin.get(login);
        replace(todos, todo, newTodo);
        Map<String, Object> body = new HashMap<>();
        body.put("todo", todo);
        ResponseEntity<Map<String, Object>> response = new ResponseEntity<>(body, HttpStatus.OK);
        return response;
    }

    private boolean isLoginExist(String login) {
        return passwordByLogin.containsKey(login);
    }

    private boolean validateEnter(String login, String password) {
       if (isLoginExist(login)) {
           return password.equals(passwordByLogin.get(login));
       }
       return false;
    }

    private void replace(List<String> list, String old, String newValue) {
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).equals(old)) {
                list.set(i, newValue);
            }
        }
    }
}
