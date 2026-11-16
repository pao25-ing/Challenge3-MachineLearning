# Entrega final del Challenge 3

## Resultado comprobado
El 15 de noviembre de 2026 (hora de Lima), la cuenta **cesarapcho** completó los cinco envíos. Todos terminaron con estado **Complete** y una Balanced Accuracy pública superior a 0,5.

| Experimento | BA pública | Estado | Seleccionado final |
|---|---:|---|---|
| 01_base | 0.73509 | Complete | Sí |
| 02_dropout | 0.73680 | Complete | Sí |
| 03_aumento | 0.67441 | Complete |  |
| 04_profunda | 0.67547 | Complete |  |
| 05_batchnorm | 0.65238 | Complete |  |

Elegimos **02_dropout** con validación antes de consultar el leaderboard. Obtuvo **0,748689** en validación y **0,73680** de puntuación pública. Dropout y la base quedaron seleccionados para la evaluación final. El resultado privado depende de la publicación del organizador.

Las puntuaciones se registraron al observar la página Submissions durante esta conversación. La [página de envíos](https://www.kaggle.com/competitions/tnm-112-lab-2-2026/submissions) permite consultar el historial al iniciar sesión en la cuenta delegada. No se ha repetido el entrenamiento ni se han realizado nuevos envíos al restaurar estos archivos.

## Material final
- [Informe final con método y resultados](../Documentación/INFORME_FINAL.md).
- [Presentación final para lectura e impresión](presentacion-final.html).
- [Notebook 01: análisis ejecutado](../notebooks/01_analisis_dataset.ipynb).
- [Notebook 02: entrenamiento ejecutado](../notebooks/02_entrenamiento_cnn.ipynb).
- [Notebook 03: exportación final y verificación de los CSV](../notebooks/03_preparacion_envios.ipynb).
- [submission.csv del modelo seleccionado](../results/cnn/submission.csv).
- [Puntuaciones y SHA-256 de los cinco archivos](../results/cnn/envios_kaggle.csv).
- [Estado final de entrega](../results/cnn/estado_entrega.json).

## Integrantes y cuenta delegada
**Grupo 1, Machine Learning, UPCH, 2026-II**

- César Alejandro Aarón Apcho Meneses.
- Paola Andrea Centeno Bazán.
- Anderson Josué Delerna Infantes.
- Jimena Natalia Vega Sánchez.

Docente: Yannick Patrick Carrasco Merma.

Según la indicación recibida del docente, una sola cuenta presenta el trabajo en Kaggle e incluye a los cuatro autores académicos. Los cuatro nombres figuran en el notebook de Kaggle y en las descripciones de los envíos. No se exige reunir las cuatro cuentas en un equipo de la competición.

## Formato aceptado por el evaluador
La página Evaluation mostraba `ID,Class` y un ejemplo desde 1. Hubo dos intentos rechazados de Dropout:
1. `ID column id not found in submission`.
2. `Solution and submission values for id do not match`.

El formato que Kaggle aceptó fue **`id,Class`**, con identificadores **0 a 32767** en el orden original de `test_x.h5`. Solo se corrigieron el encabezado y la base del índice; las clases predichas permanecieron iguales.

Los archivos `candidato_*`, `criterio_ids.json` y las salidas de la celda de exportación del notebook 02 conservan la ejecución inicial. **Para entregar se utilizan `submission.csv` y `submission_*.csv`.** Las cinco firmas de los archivos restaurados coinciden exactamente con las registradas antes de enviarlos.

## Reproducir la exportación sin entrenar
1. Descargar o clonar el repositorio completo.
2. Abrir una terminal dentro de la carpeta del repositorio.
3. Ejecutar `python scripts/preparar_envios.py`, o abrir el notebook 03 desde `notebooks/` y ejecutar su celda.
4. Comprobar las cinco firmas SHA-256 y `results/cnn/submission.csv`.

Solo se requiere Python estándar. Se validan encabezados, cantidad de filas, ID, clases y conservación del orden. El script no realiza envíos a Kaggle.

## Reproducir el entrenamiento
El notebook 02 carga los tres HDF5 oficiales, entrena cinco configuraciones y guarda métricas, modelos, curvas y predicciones.

En [Colab](https://colab.research.google.com/github/pao25-ing/Challenge3-MachineLearning/blob/main/notebooks/02_entrenamiento_cnn.ipynb), colocar `train.h5`, `valid.h5` y `test_x.h5` en `Mi unidad/Challenge3/data`, activar GPU si está disponible y ejecutar todas las celdas. En Kaggle se importan los datos oficiales mediante Add Input y se usa Save & Run All.

La [ejecución original](https://www.kaggle.com/code/cesarapcho/challenge-3-upch-grupo-1-cnn-pcam?scriptVersionId=370083154) duró 39 min 23 s en CPU con TensorFlow 2.21.0. Es privada en Kaggle; la copia ejecutada se revisa en GitHub. Para repetir desde cero, establecer `REUTILIZAR_COMPLETADOS = False`. Después del entrenamiento, ejecutar la conversión del notebook 03.

## Documentación y límites pendientes
El informe final en Markdown y la presentación HTML describen la implementación real, los cinco puntajes públicos y el formato aceptado. La presentación se puede imprimir desde el navegador.

Los PDF anteriores del repositorio conservan la propuesta inicial y no reflejan todos estos resultados. Los PDF corregidos preparados en la conversación no llegaron a publicarse antes de que el entorno dejara de estar disponible. **Para revisar la versión vigente, utilizar los documentos finales enlazados arriba.**

La rúbrica solicita un enlace nativo compartido de Canva o Google Slides. No se pudo acceder al diseño original de Canva con la cuenta conectada. La revisión automática rechazó importar una copia corregida a Canva porque faltaba autorización explícita para compartir allí los nombres y resultados del grupo. Ese enlace sigue pendiente de autorización. No se afirma que exista una presentación nativa compartida verificada.

Los modelos permanecen en los outputs privados de Kaggle. El envío de los pesos a GitHub no forma parte de esta publicación.

## Fuentes
- [Competición, datos y evaluación](https://www.kaggle.com/competitions/tnm-112-lab-2-2026).
- [Resultados de validación](../results/cnn/README.md).
- [Informe final y referencias](../Documentación/INFORME_FINAL.md).
- Rúbrica del Challenge 3 facilitada por el docente.
