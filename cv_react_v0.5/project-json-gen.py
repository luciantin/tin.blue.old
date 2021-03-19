import json

personal = {
    "name": "Lucian Tin",
    "email": "luciantin@protonmail.com",
}

ESP32CamPyController = {
    "pname": "ESP32Cam-PyController",
    "pdesc": "description",
    "pgit": "https://github.com/luciantin/ESP32Cam-PyController",
    "plink": "none",
    "tstack": ["cpp", "ESP32", "PlatformIO"],
    "isWip": False,
    "image": "",
}

tiamat = {
    "pname": "tiamat",
    "pdesc": "description",
    "pgit": "https://github.com/luciantin/tiamat",
    "plink": "https://github.com/luciantin/tiamat",
    "tstack": ["vue", "express", "scss", "firebase"],
    "isWip": False,
    "image": "",
}

MRZ = {
    "pname": "3Dof",
    "pdesc": "description",
    "pgit": "https://github.com/luciantin/MRZ-Detector",
    "plink": "none",
    "tstack": ["python", "pytorch", "opencv"],
    "isWip": False,
    "image": "",
}

ESP32Stereo = {
    "pname": "ESP32Stereo",
    "pdesc": "description",
    "pgit": "https://github.com/luciantin/ESP32Stereo",
    "plink": "none",
    "tstack": ["python", "opencv"],
    "isWip": True,
    "image": "",
}

SpaceballBench = {
    "pname": "SpaceballBench",
    "pdesc": "description",
    "pgit": "https://github.com/luciantin/SpaceballBench",
    "plink": "none",
    "tstack": ["kubernetes", "flask", "express", "redis", "mongodb", "kafka"],
    "isWip": True,
    "image": "",
}

Vet = {
    "pname": "Vet",
    "pdesc": "College \"group\" project ",
    "pgit": "https://github.com/luciantin/faks-Baze",
    "plink": "none",
    "tstack": ["oracle", "arch", "stackoverflow", "cpp"],
    "isWip": False,
    "image": "",
}

BI = {
    "pname": "BI",
    "pdesc": "description",
    "pgit": "https://github.com/luciantin/faks-SPI",
    "plink": "none",
    "tstack": ["python", "sqlAlchemy", "docker", "mysql", "pentaho"],
    "isWip": True,
    "image": "",
}

projects = [ESP32Stereo, ESP32CamPyController, tiamat, MRZ, SpaceballBench, Vet, BI]

with open('projects.json', 'w') as outfile:
    json.dump(projects, outfile)
