
import { Section } from './types';

export const PYTHON_SECTIONS: Section[] = [
  {
    id: 'intro',
    title: '1. Introducción y Salida',
    description: 'Aprende a comunicarte con la computadora.',
    theory: 'Python es un lenguaje de programación de alto nivel, conocido por su legibilidad. El primer paso en cualquier lenguaje es imprimir un mensaje en la pantalla usando la función `print()`. Las cadenas de texto (strings) se escriben entre comillas dobles o simples.',
    codeExample: 'print("¡Hola, Python!")',
    challenge: 'Escribe un código que imprima tu nombre y una ciudad que te gustaría visitar en líneas separadas.',
    unlockCode: 'PY-START-2024',
    questions: [
      {
        id: 'q1',
        text: '¿Cuál es la función principal para mostrar texto en Python?',
        options: ['echo()', 'print()', 'log()', 'display()'],
        correctIndex: 1
      },
      {
        id: 'q2',
        text: '¿Cómo se encierran las cadenas de texto en Python?',
        options: ['Entre comillas', 'Entre corchetes', 'Entre llaves', 'No se encierran'],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'variables',
    title: '2. Variables y Tipos',
    description: 'Guarda información para usarla más tarde.',
    theory: 'Las variables son "cajas" donde guardamos datos. En Python no necesitas declarar el tipo de dato, él lo deduce automáticamente. Tipos comunes: int (enteros), float (decimales), str (texto) y bool (verdadero/falso).',
    codeExample: 'nombre = "Alex"\nedad = 25\nprint(f"{nombre} tiene {edad} años")',
    challenge: 'Crea dos variables: `base` y `altura`, asígnale valores numéricos y calcula el `area` de un rectángulo (base * altura). Imprime el resultado con un mensaje descriptivo.',
    unlockCode: 'VAR-SAVE-99',
    questions: [
      {
        id: 'q3',
        text: '¿Qué símbolo se usa para asignar un valor a una variable?',
        options: [':=', '==', '=', '->'],
        correctIndex: 2
      },
      {
        id: 'q4',
        text: '¿Cuál de estos es un nombre de variable válido?',
        options: ['1variable', 'mi-variable', 'mi_variable', 'class'],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'control',
    title: '3. Control de Flujo',
    description: 'Toma decisiones con if, else y elif.',
    theory: 'El control de flujo permite que tu programa tome caminos diferentes según condiciones. Usamos `if`, `elif` y `else`. Es crucial usar la indentación (4 espacios) para definir qué código pertenece a cada bloque.',
    codeExample: 'nota = 8\nif nota >= 5:\n    print("Aprobado")\nelse:\n    print("Suspenso")',
    challenge: 'Escribe un programa que verifique si un número guardado en una variable `x` es mayor que 100, menor que 100 o exactamente 100.',
    unlockCode: 'IF-ELSE-FLOW',
    questions: [
      {
        id: 'q5',
        text: '¿Qué es fundamental en Python para definir bloques de código?',
        options: ['Punto y coma', 'Llaves {}', 'Indentación (espacios)', 'Paréntesis'],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'lists',
    title: '4. Listas y Colecciones',
    description: 'Gestiona grupos de datos ordenados.',
    theory: 'Las listas permiten guardar múltiples valores en una sola variable. Se definen con corchetes `[]` y los elementos se acceden mediante índices (empezando por 0).',
    codeExample: 'frutas = ["manzana", "pera", "kiwi"]\nprint(frutas[0]) # Manzana\nfrutas.append("naranja")',
    challenge: 'Crea una lista llamada `colores` con 3 colores. Añade uno nuevo al final e imprime la longitud de la lista usando `len()`.',
    unlockCode: 'LIST-COLLECT-X',
    questions: [
      {
        id: 'q7',
        text: '¿Cuál es el índice del primer elemento de una lista?',
        options: ['1', '0', '-1', 'A'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'functions',
    title: '5. Funciones',
    description: 'Reutiliza tu código de forma inteligente.',
    theory: 'Las funciones son bloques de código reutilizables que solo se ejecutan cuando se llaman. Se definen con la palabra clave `def`. Pueden recibir parámetros y devolver valores con `return`.',
    codeExample: 'def saludar(nombre):\n    return f"Hola {nombre}!"\n\nmsg = saludar("Estudiante")\nprint(msg)',
    challenge: 'Define una función llamada `doble` que reciba un número como parámetro y devuelva el resultado de multiplicarlo por 2. Pruébala imprimiendo el doble de 21.',
    unlockCode: 'DEF-FUNC-RUN',
    questions: [
      {
        id: 'q8',
        text: '¿Qué palabra clave se usa para crear una función?',
        options: ['func', 'function', 'def', 'create'],
        correctIndex: 2
      }
    ]
  }
];
