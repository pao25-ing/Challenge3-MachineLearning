from pathlib import Path
import csv
import hashlib
import json
import shutil

# Localizar la raíz del repositorio en Jupyter, Colab o Kaggle.
candidatas = [Path.cwd(), Path.cwd().parent]
if Path('/kaggle/working').exists():
    candidatas += [p.parent.parent.parent for p in Path('/kaggle/input').rglob('candidato_01_base.csv')]
raices = [p for p in candidatas if (p / 'results/cnn/candidato_01_base.csv').is_file()]
if not raices:
    raise FileNotFoundError('Clonar el repositorio y ejecutar este cuaderno desde su carpeta notebooks.')
raiz = raices[0]
origen = raiz / 'results/cnn'
salida = Path('/kaggle/working/results/cnn') if Path('/kaggle/working').exists() else origen
salida.mkdir(parents=True, exist_ok=True)
registros = []
for experimento in ['01_base', '02_dropout', '03_aumento', '04_profunda', '05_batchnorm']:
    fuente = origen / f'candidato_{experimento}.csv'
    with fuente.open(newline='', encoding='utf-8') as archivo:
        lector = csv.DictReader(archivo)
        assert lector.fieldnames == ['ID', 'Class']
        filas = list(lector)
    assert len(filas) == 32768
    assert [int(f['ID']) for f in filas] == list(range(1, 32769))
    assert {f['Class'] for f in filas} <= {'0', '1'}
    destino = salida / f'submission_{experimento}.csv'
    with destino.open('w', newline='', encoding='utf-8') as archivo:
        escritor = csv.writer(archivo)
        escritor.writerow(['id', 'Class'])
        escritor.writerows((i, int(f['Class'])) for i, f in enumerate(filas))
    with destino.open(newline='', encoding='utf-8') as archivo:
        lector = csv.DictReader(archivo)
        assert lector.fieldnames == ['id', 'Class']
        comprobacion = list(lector)
    assert [int(f['id']) for f in comprobacion] == list(range(32768))
    assert [int(f['Class']) for f in comprobacion] == [int(f['Class']) for f in filas]
    firma = hashlib.sha256(destino.read_bytes()).hexdigest()
    registros.append(dict(experimento=experimento, archivo=destino.name, filas=32768, sha256=firma))
    print(f'{destino.name}: 32768 filas, id=0..32767, clases verificadas. SHA-256 {firma}')
shutil.copyfile(salida / 'submission_02_dropout.csv', salida / 'submission.csv')
(salida / 'archivos_enviados.json').write_text(json.dumps(registros, indent=2, ensure_ascii=False), encoding='utf-8')
print('submission.csv coincide con 02_dropout, seleccionado por validación antes de los envíos.')
print('La generación de estos archivos no realiza nuevos envíos. Las puntuaciones reales están en docs/ENTREGA_KAGGLE.md.')
