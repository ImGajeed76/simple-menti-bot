
# Project Title

A brief description of what this project does and who it's for


# Interflow

A npm package for console control.


## Installation

Install interflow with npm

```bash
  npm install interflow
```

## Features

- logging with timestamp, warning, info, error, debug and success
- logging with colors
- string input, bool input and option input
- key event system
- cursor control: setPosition, getPosition
- clear console/line
- customizable progressbar
## Usage/Examples

### Hello World

```typescript
import {Interflow} from 'interflow'
import {stdin, stdout} from 'node:process'

async function main() {
  const interflow = new Interflow(stdin, stdout)
  interflow.log("Hello World")
}

main()
```

Output
```
Hello World
```

### Input

```typescript
const interflow = new Interflow(stdin, stdout)

await interflow.input("Whats your name? ", (input) => {
  interflow.log("Hello", input)
})
```

Output
```
What is your name? (Interflow)
Hello (Interflow)
```

### Colors

```typescript
import {Interflow, InterflowColor} from 'interflow'

const interflow = new Interflow(stdin, stdout)

interflow.log(
  InterflowColor.red("Something in red!")
)
```

Output
```
Something in red! (it's red trust me)
```

### Key input

```typescript
const interflow = new Interflow(stdin, stdout)

interflow.on("key", (key) => {
  interflow.log(key.bytes, key.code(), key.value())
})
```

Output
```
(key press "a")
97 a a

(key press "arrow up")
27,91,65 up (value is empty since its not a visible char)
```


## Documentation

### Interflow

#### Config
```typescript
const interflow = new Interflow(stdin, stdout, {
  timestamps: false,
  debugConfig: {
    showLineNumbers: false,
    showLineNumbersFromAbsolute: false,
  }
})
```

---

#### Log
```typescript
// normal log
interflow.log("hello world")

// with multiple objects
interflow.log("hello", "world")

// info
interflow.info("some info")

// warning
interflow.warning("some warning")

// error
interflow.error("some error")

// debug
interflow.debug("some debug")

// success
interflow.success("some success")
```

---

#### Input

String
```typescript
await interflow.input("Whats your name?", (input) => {
    interflow.log("Hello", input)
})
```
```
Whats your name? (Interflow)
Hello (Interflow)
```

Bool
```typescript
await interflow.boolInput("Would you like to continue?", (input) => {
    interflow.log("You chose", input)
})
```
```
Would you like to continue? (Y/n)
You chose (true)
```

Multiple options
```typescript
let options = ["option 2", "option 2", "option 3"]

await interflow.chooseInput("Choose an option?", options, (input) => {
    interflow.log("You chose", input)
})
```
```
Choose an option? [option 1] [option 2] [option 3]
You chose (option 2)
```

---

#### Events

Key
```typescript
interflow.on("key", (key) => {
    interflow.log(key.bytes, key.code(), key.value())
})
```

---

#### Cursor Control

```typescript
interflow.goto(x, y, from_absolute)
// absolute is from very top
// relative is from first log

interflow.up(n_lines)
interflow.down(n_lines)
```

---

#### Console

```typescript
interflow.clear() // Clear whole console

interflow.clearLine(line, from_absolute)
// absolute is from very top
// relative is from first log
```

### InterflowColor

#### Usage

```typescript
interflow.log(
    InterflowColor.green("You made it until here!")
)
```

#### Colors

Foreground
- red
- green
- yellow
- blue
- magenta
- cyan
- white
- gray
- black

* redBright
* greenBright
* yellowBright
* blueBright
* magentaBright
* cyanBright
* whiteBright

Background
- bgRed
- bgYellow
- bgBlue
- bgMagenta
- bgCyan
- bgWhite
- bgBlack

* bgRedBright
* bgGreenBright
* bgYellowBright
* bgBlueBright
* bgMagentaBright
* bgCyanBright
* bgWhiteBright

Fonts
- bold
- dim
- italic
- underline
- inverse
- hidden
- strikeThrough

### InterflowProgressbar

#### Basic Usage

```typescript
const interflow = new Interflow(stdin, stdout);

const bar = new InterflowProgressBar(interflow)
    .setLabel('Loading')
    .setUseBlocks(true)
    .setBarLength(50)
    .setMax(1000);

for (let i = 0; i < 1000; i++) {
    bar.tick();
    await interflow.sleep(100);

    if (i % 20 === 0) {
        interflow.log("Index", i)
    }
}
```
```
Loading [█████████████                                     ] (27%)
Index 0
Index 20
```


## Authors

- [@ImGajeed76](https://www.github.com/imgajeed76)

