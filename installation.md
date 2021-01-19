# resume-scanner

## Installation

On Linux machines, run the following in the root directory:
```
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
deactivate
```

##### Note that the backend uses Popper as a Python system dependency for [pdf2imagine](https://pypi.org/project/pdf2image/).

```
sudo apt-get install poppler-utils
```

## Usage

To activate the virtual environment, run the following from the root directory:
```
source env/bin/activate
```
Then, execute the main file in the src directory:
```
cd src/
python3 main.py
```
or
```
python3 src/main.py
```
Deactivate the virtual environment when finished:
```
deactivate
```