# Memotest Mundial 2026

Examen final de Desarrollo y Arquitecturas Web (UAI, 2026): un juego de memoria (memotest) hecho con
HTML5, CSS3 y JavaScript.

Jugar la versión publicada: <https://rodom.github.io/final_daw_2026/>

## Descripción

El memotest es el clásico juego de encontrar pares: se muestra un tablero de cartas boca abajo, cada
una con una bandera repetida en otra carta del tablero. El jugador da vuelta dos cartas por turno; si
coinciden, quedan boca arriba; si no, se vuelven a tapar. El juego termina cuando se encontraron todos
los pares.

## Temática

Banderas de las selecciones del Mundial 2026.

## Cómo se juega

1. En la pantalla de inicio se ingresa el nombre del jugador y se elige un nivel de dificultad (o se
   elige jugar el modo progresivo).
2. Al hacer click en una carta, se da vuelta y muestra la bandera. Al hacer click en una segunda carta:
   - Si las banderas coinciden, ambas quedan marcadas como acertadas.
   - Si no coinciden, se tapan de nuevo después de un instante.
3. La partida termina al encontrar todos los pares del tablero. Se muestra un modal con el resultado y
   el desglose del puntaje, y la partida se guarda en el ranking.

### Niveles

| Nivel   | Tablero | Cartas | Pares |
| ------- | ------- | ------ | ----- |
| Fácil   | 4x4     | 16     | 8     |
| Medio   | 4x5     | 20     | 10    |
| Difícil | 6x6     | 36     | 18    |

Cada nivel tiene, además, su propia penalización por error (ver sistema de puntaje).

## Sistema de puntaje

| Concepto                       | Valor                                  |
| ------------------------------ | -------------------------------------- |
| Par correcto                   | +100 puntos                            |
| Error en fácil                 | -10 puntos                             |
| Error en medio                 | -20 puntos                             |
| Error en difícil               | -30 puntos                             |
| Bonus por completar la partida | +300 puntos                            |
| Penalización por tiempo        | -1 punto por cada segundo transcurrido |

El bonus y la penalización por tiempo se aplican una sola vez, al finalizar la partida. El puntaje
nunca queda en negativo: si una resta lo llevaría por debajo de 0, se acota a 0.

### Reglas avanzadas de puntaje

Además de la fórmula base, se suman o restan estos conceptos:

| Concepto                                                             | Valor                                                                             |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Bonus por racha de 3 aciertos seguidos o más                         | +20 puntos por cada acierto de la racha                                           |
| Penalización extra por cada error seguido a partir del segundo       | -5 puntos adicionales sobre la penalización del nivel, por cada error consecutivo |
| Bonus por terminar fácil en 60 segundos o menos                      | +100 puntos                                                                       |
| Bonus por terminar medio en 90 segundos o menos                      | +100 puntos                                                                       |
| Bonus por terminar difícil en 150 segundos o menos                   | +100 puntos                                                                       |
| Bonus por completar con pocos intentos (pares del nivel + 2 o menos) | +100 puntos                                                                       |

La racha de aciertos y la de errores seguidos se cortan apenas ocurre el evento contrario. Al llegar
al 3er acierto seguido se suman de una vez los +20 de los tres aciertos de la racha, y después se
suman otros +20 por cada acierto adicional mientras la racha continúe. El modal de victoria muestra
el desglose completo de cada concepto que sumó o restó puntos.

En el modo progresivo, el bonus por finalizar y la penalización por tiempo se aplican **una vez por
cada nivel** (fácil, medio y difícil), no una sola vez al final del recorrido completo.

## Ranking, modo oscuro, modo progresivo y sonidos

- **Ranking**: cada partida guarda jugador, nivel, puntaje, intentos, errores, fecha y duración en
  LocalStorage (clave `memotest-partidas`, últimas 50 partidas). Se puede ordenar por puntaje, fecha,
  duración o nivel, y borrar el historial completo con confirmación.
- **Modo oscuro y claro**: preferencia guardada en LocalStorage (clave `memotest-tema`), disponible en
  el juego y en la página de contacto.
- **Modo progresivo**: arranca en fácil y avanza automáticamente a medio y difícil, acumulando el
  puntaje entre niveles. Al terminar los tres niveles muestra un resultado general y guarda una única
  partida marcada como "Progresivo" en el ranking.
- **Sonidos**: al seleccionar una carta, acertar un par, cometer un error y ganar la partida. Se
  pueden activar o desactivar, con la preferencia guardada en LocalStorage (clave `memotest-sonidos`).

## Funcionalidades obligatorias

- Tres niveles de dificultad (fácil, medio, difícil) elegibles antes de comenzar la partida.
- Tablero de cartas generado dinámicamente según el nivel elegido.
- Detección de pares, conteo de intentos, errores y tiempo de partida.
- Sistema de puntaje propio, documentado en este README.
- Validación con JavaScript del nombre del jugador y del nivel elegido, sin `alert`, `prompt` ni
  `confirm`.
- Formulario de contacto que abre el cliente de mail del sistema operativo (`mailto`).
- Diseño responsive con Flexbox, mobile first.

## Funcionalidades deseadas implementadas

- Ranking de partidas con LocalStorage.
- Modo oscuro y modo claro con preferencia persistente.
- Modo progresivo, que avanza de fácil a difícil acumulando el puntaje.
- Sonidos con opción de activar o desactivar.
- Sistema avanzado de puntaje (rachas, penalización progresiva, bonus por rapidez y por pocos
  intentos).
- Accesibilidad: textos alternativos en las banderas, `aria-label` en las cartas, mensajes de error
  anunciados por lectores de pantalla y estados visuales para carta seleccionada, acertada y con
  error que no dependen solo del color.

## Fuente de las imágenes

Las banderas de `assets/images/banderas/` son del proyecto [flag-icons](https://github.com/lipis/flag-icons)
de Panayiotis Lipiridis, publicado bajo licencia MIT.

## Fuente de los sonidos

- `acierto.mp3` y `victoria.mp3`: incluidos en la estructura inicial del proyecto.
- `seleccionar.wav` y `error.wav`: generados para este proyecto con un script propio (tonos
  sintetizados con el módulo `wave` de Python), sin usar audio de terceros.

## Integrantes

- Ignacio Cainelli
- Alejandro Santini
- Rodolfo Meroi
