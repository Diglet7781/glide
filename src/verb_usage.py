from resume_converter import resume_to_str
import prechecks
import json
import PyPDF2
from PyPDF2 import PdfFileReader 
import re
import collections

def good_verbs(filename, resume_as_dict):
    pos_dict = {}
    with open("resume_verbs.json") as jsonFile:
        jsonObject = json.load(jsonFile)

    if "positions" in resume_as_dict:
        for work_description in resume_as_dict["positions"]:
            if work_description.get("org") != None:
                pos_dict[work_description.get("org")] = []
                if work_description.get("summary") != None:
                    string = work_description.get("summary")
                    string_strip = string.strip()
                    string_split = string_strip.split()
                    for verb in jsonObject["good"]:
                        for index in string_split:
                            index_end = index[-3:]
                            if index_end == "ing":
                                new_index = index[:-3] + "ed"
                                print(new_index)
                                if verb.lower() == new_index.lower() and not(new_index.lower() in pos_dict[work_description.get("org")]):
                                    pos_dict[work_description.get("org")].append(new_index.lower())
                            else:
                                if verb.lower() == index.lower() and not(index.lower() in pos_dict[work_description.get("org")]):
                                    pos_dict[work_description.get("org")].append(index.lower())

    return pos_dict

def verb_score(good_verbs, resume_as_dict):
    verb_points = 0
    verb_scores = {}

    if "positions" in resume_as_dict:
        for summary in resume_as_dict["positions"]:
            if summary.get("org") != None:
                number_verbs = len(good_verbs[summary.get("org")])
                if number_verbs >= 1:
                    verb_points = 100
            verb_scores[summary.get("org")] = verb_points
            verb_points = 0
    
    return verb_scores



