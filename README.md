
# Challenge 3 – Clasificación Supervisada

## 1. Introducción

El presente proyecto se desarrolla como parte del **Challenge 3 del curso Machine Learning** de la Universidad Peruana Cayetano Heredia (UPCH), correspondiente a la unidad de Algoritmos de Aprendizaje Supervisado.

Para este desafío se seleccionó la competición [TNM112-Lab2 (2026)](https://www.kaggle.com/competitions/tnm-112-lab-2-2026), disponible en la plataforma Kaggle, que propone la clasificación de imágenes histopatológicas mediante técnicas de aprendizaje supervisado.

El proyecto se enfoca en la identificación de tejido metastásico en imágenes microscópicas de ganglios linfáticos, utilizando el conjunto de datos **PatchCamelyon (PCam)**. Para resolver este problema, la competición plantea el entrenamiento de redes neuronales convolucionales (*Convolutional Neural Networks*, CNN), capaces de aprender patrones visuales y realizar predicciones sobre imágenes no utilizadas durante su entrenamiento.

Esta competición permite aplicar conocimientos de Machine Learning a un problema del ámbito médico y explorar el uso de modelos de clasificación en el análisis automatizado de imágenes.

## 2. Descripción de la competición

### 2.1. Información general

| Característica | Descripción |
|---|---|
| **Nombre** | TNM112-Lab2 (2026) |
| **Plataforma** | Kaggle |
| **Organizador** | YifanD@LiU |
| **Área de aplicación** | Salud – Análisis de imágenes médicas |
| **Tipo de aprendizaje** | Supervisado |
| **Tipo de problema** | Clasificación binaria |
| **Dataset** | PatchCamelyon (PCam) |
| **Modelo solicitado** | Red neuronal convolucional (CNN) |
| **Métrica de evaluación** | Balanced Accuracy |
| **Formato de entrega** | Archivo CSV |
| **Enlace** | [TNM112-Lab2 (2026)](https://www.kaggle.com/competitions/tnm-112-lab-2-2026) |

### 2.2. Problemática

El cáncer de mama puede propagarse hacia los ganglios linfáticos, donde la presencia de células tumorales constituye un indicador importante para determinar la extensión de la enfermedad y orientar las decisiones médicas.

La identificación de tejido metastásico requiere analizar imágenes histopatológicas obtenidas de muestras de tejido. Este proceso implica reconocer características microscópicas que permitan distinguir regiones con presencia de metástasis de aquellas que no presentan tejido metastásico.

El análisis de numerosas imágenes puede representar una tarea exigente debido a la cantidad de información visual y a las variaciones en las características de los tejidos.

Ante esta problemática, el aprendizaje automático ofrece la posibilidad de desarrollar sistemas capaces de reconocer patrones en imágenes histopatológicas y apoyar su clasificación.

La competición **TNM112-Lab2 (2026)** aborda este problema mediante la construcción de un modelo que permita identificar automáticamente la presencia o ausencia de tejido metastásico en pequeños fragmentos de imágenes de ganglios linfáticos.

### 2.3. Objetivo de la competición

**Objetivo general**

Desarrollar un modelo de clasificación supervisada basado en redes neuronales convolucionales (CNN) que permita identificar la presencia o ausencia de tejido metastásico en imágenes histopatológicas del conjunto de datos PatchCamelyon (PCam).

**Objetivos específicos**

1. Comprender la problemática de clasificación de imágenes histopatológicas asociadas con la detección de metástasis.
2. Utilizar imágenes etiquetadas del dataset PCam para el entrenamiento de un modelo supervisado.
3. Implementar una red neuronal convolucional para clasificar imágenes según la presencia o ausencia de tejido metastásico.
4. Evaluar el desempeño del modelo mediante la métrica *Balanced Accuracy*.
5. Generar predicciones sobre el conjunto de prueba y presentar los resultados en la plataforma Kaggle.

### 2.4. Funcionamiento del reto

La competición proporciona un conjunto de imágenes histopatológicas correspondientes a pequeños fragmentos extraídos de escaneos digitales de ganglios linfáticos.

Cada imagen del conjunto de entrenamiento tiene asociada una etiqueta que indica si contiene tejido metastásico.

El desafío consiste en desarrollar y entrenar una CNN capaz de aprender las características visuales de ambas categorías y posteriormente clasificar nuevas imágenes.

El procedimiento general comprende las siguientes etapas:

1. **Obtención de datos:** acceder al conjunto de imágenes proporcionado por Kaggle.
2. **Preparación de imágenes:** organizar y preparar los datos para su procesamiento.
3. **Entrenamiento:** utilizar imágenes etiquetadas para entrenar una CNN.
4. **Predicción:** aplicar el modelo a imágenes del conjunto de prueba.
5. **Evaluación:** generar un archivo CSV con las predicciones y enviarlo a Kaggle para obtener una puntuación.

El archivo de predicciones debe contener las columnas `ID` y `Class`, siguiendo el formato establecido por la competición.

**Ejemplo del archivo `submission.csv`:**

```csv
ID,Class
1,0
2,1
3,0
```

Este procedimiento permite evaluar qué tan bien el modelo aprendido puede clasificar imágenes que no formaron parte de su entrenamiento.

### 2.5. Evaluación de los resultados

La competición utiliza la métrica **Balanced Accuracy** para evaluar las predicciones realizadas por los modelos participantes.

Esta métrica calcula el promedio de la sensibilidad obtenida en cada clase. Resulta especialmente útil cuando existe un desequilibrio entre la cantidad de ejemplos de las diferentes categorías, ya que evita que el desempeño se valore únicamente por la clase más frecuente.

En un problema de clasificación binaria, se puede expresar mediante:

\[
\text{Balanced Accuracy} =
\frac{\text{Sensibilidad}+\text{Especificidad}}{2}
\]

La competición divide el conjunto de prueba utilizado para la evaluación en dos partes:

| Clasificación | Porcentaje | Descripción |
|---|---|---|
| **Public Leaderboard** | 30 % | Permite visualizar el rendimiento de los participantes durante la competición. |
| **Private Leaderboard** | 70 % | Determina la clasificación final una vez publicados los resultados privados. |

El uso del leaderboard privado permite comprobar si las soluciones mantienen un buen desempeño sobre datos que no se utilizaron para obtener la clasificación pública.

### 2.6. Requisitos de participación

De acuerdo con las indicaciones publicadas en la competición, los participantes deben cumplir los siguientes requisitos:

- Entrenar una red neuronal convolucional para clasificar las imágenes.
- Realizar al menos **cinco submissions válidas**, con un rendimiento superior a una predicción aleatoria.
- Documentar las modificaciones utilizadas para mejorar el desempeño de la CNN.
- Generar y enviar archivos CSV con las predicciones al sistema de evaluación de Kaggle.

Adicionalmente, la competición incentiva la exploración de técnicas como *data augmentation*, regularización, *transfer learning* y métodos de ensamble para mejorar el desempeño de los modelos.

### 2.7. Justificación de la elección

Se seleccionó la competición **TNM112-Lab2 (2026)** debido a su relación con los contenidos de clasificación supervisada abordados en el curso de Machine Learning y su aplicación en el análisis de imágenes médicas.

A diferencia de problemas tradicionales de clasificación basados únicamente en datos tabulares, esta competición permite explorar el aprendizaje de características visuales mediante redes neuronales convolucionales.

Asimismo, la problemática tiene relevancia en el ámbito de la salud, ya que la detección de tejido metastásico en ganglios linfáticos constituye un aspecto importante en la evaluación del cáncer de mama.

La disponibilidad del dataset PCam, las reglas de evaluación y el sistema de clasificación de Kaggle permiten desarrollar experimentos, comparar resultados y analizar el desempeño de diferentes configuraciones del modelo.

Por estas razones, la competición representa una oportunidad para aplicar los conocimientos adquiridos durante el curso y comprender las posibilidades del aprendizaje supervisado en problemas de clasificación de imágenes.

## Referencias bibliográficas

[1] YifanD@LiU. (2026). *TNM112-Lab2 (2026)*. Kaggle. https://www.kaggle.com/competitions/tnm-112-lab-2-2026

[2] Veeling, B. S., Linmans, J., Winkens, J., Cohen, T., & Welling, M. (2018). *Rotation equivariant CNNs for digital pathology*. arXiv. https://arxiv.org/abs/1806.03962

[3] Scikit-learn developers. (s. f.). *Balanced accuracy score*. Scikit-learn. https://scikit-learn.org/stable/modules/generated/sklearn.metrics.balanced_accuracy_score.html
