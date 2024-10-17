package todoList.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import todoList.dto.DeleteDto;
import todoList.dto.EditDto;
import todoList.dto.UserDto;
import todoList.model.LoginAndPassword;
import todoList.service.TodoService;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class TodoListController {

    private final TodoService todoService;

    @PostMapping("/login")
    @CrossOrigin(origins = {"http://localhost:3002", "http://localhost:3000"})
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginAndPassword loginAndPassword) {
        return todoService.login(loginAndPassword.getLogin(), loginAndPassword.getPassword());
    }

    @PostMapping("/signup")
    @CrossOrigin(origins = {"http://localhost:3002", "http://localhost:3000"})
    public void signup(@RequestBody LoginAndPassword loginAndPassword) {
        todoService.register(loginAndPassword.getLogin(), loginAndPassword.getPassword());
    }

    @GetMapping("/{username}")
    @CrossOrigin(origins = {"http://localhost:3002", "http://localhost:3000"})
    public ResponseEntity<List<String>> get(@PathVariable String username) {
        return todoService.getUserTodos(username);
    }

    @PostMapping("/add")
    @CrossOrigin(origins = {"http://localhost:3002", "http://localhost:3000"})
    public ResponseEntity<Map<String, Object>> add(@RequestBody UserDto userDto) {
        return todoService.addTodo(userDto.getLogin(), userDto.getTodo());
    }

    @DeleteMapping("/delete")
    @CrossOrigin(origins = {"http://localhost:3002", "http://localhost:3000"})
    public ResponseEntity<Map<String, Object>> delete(@RequestBody DeleteDto dto) {
        return todoService.deleteToDo(dto.getLogin(), dto.getTodo());
    }

    @PutMapping("/edit")
    @CrossOrigin(origins = {"http://localhost:3002", "http://localhost:3000"})
    public ResponseEntity<Map<String, Object>> edit(@RequestBody EditDto userDto) {
        return todoService.updateTodo(userDto.getLogin(), userDto.getOldTodo(), userDto.getNewTodo());
    }
}
