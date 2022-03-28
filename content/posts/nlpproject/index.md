---
title: "Resume NLP Project"
description: "Machine Learning Applied to Resumes and Job Postings."
date: 2020-06-08T08:06:25+06:00
menu:
  sidebar:
    name: Resume NLP Project
    identifier: resume nlp project
    weight: 10
hero: resume.jpg
tags: ["Basic", "Multi-lingual"]
categories: ["Basic"]
---

---

In this project the main goal was to compare an applicant's resume to a job posting using machine learning techniques identify parts where the resume matches the job posting and find areas where the it needs attention.  

--Although the site is functional, it is mostly for demonstration purposes.  I worked on this project along with 3 engineers.

http://www.rezume.ai/



**The following images are a representation of the functionality using a random job posting and a random resume from Indeed**

The top right section assings a score based on how similiar a section of the resume is to the job posting.
![vscode](/img/resumeanalysis.png)

This graph is basically a representation of the job posting and the resume.
The dots (representing words) are initally assigned random coordinates, but dots that are closer to each other on the graph are closer in meaning or context.
![vscode](/img/resumejobgraph2d.png)


**I worked on the following tasks of the projects**

Visualization using JavaScript and PlotlyJS

Anonymizing data using SpaCy and Python

Data gathering using Selenium and Python to scrape data.