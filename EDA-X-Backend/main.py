from fastapi import FastAPI , Response , Form , UploadFile , File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import matplotlib.pyplot as plt
import io
from fastapi.responses import JSONResponse
from typing import Annotated , Optional
import google.generativeai as genai
import json
import re
import base64

response = None 
genai.configure(api_key="")


data = [['tom', 10], ['nick', 15], ['juli', 14]]

app = FastAPI()


origins = [
    "http://localhost:5173",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# df = pd.read_csv('https://raw.githubusercontent.com/vishalsiram/StreamlitDataVisualizationApp/refs/heads/master/diabetes.csv')


def generate_plot(df, prompt: str | None):
    if prompt:
        query = f"For EDA, tell me the plot type(ax subplot type) and column names. Only return JSON: {{ 'plotType': '', 'Columns': [] }}. {prompt}"
        response = genai.GenerativeModel("gemini-2.0-flash").generate_content(query)

        response_text = response.text.strip() 
        print("Raw Response:", repr(response_text))  

       
        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
        if not json_match:
            print("Invalid Response Format")
            return None 

        json_data = json_match.group(0)

        try:
            response_dict = json.loads(json_data)
            plot_type = response_dict.get("plotType", "Unknown")
            columns = response_dict.get("Columns", [])

          
            if isinstance(columns, str):
                columns = [col.strip() for col in columns.split(" and ")]
            
            if not isinstance(columns, list) or len(columns) == 0:
                print("Invalid Columns Format")
                return None  
            
            print("Plot Type:", plot_type)
            print("Columns:", columns)

        except json.JSONDecodeError:
            print("JSON Parsing Error")
            return None  
        fig, ax = plt.subplots()

        try:
            if plot_type == "histogram":
                ax.hist(df[columns[0]], bins=10)
            elif plot_type == "scatter" and len(columns) > 1:
                ax.scatter(df[columns[0]], df[columns[1]])
            elif plot_type == "bar" and len(columns) > 1:
                    x_values = df[columns[0]].astype(str) 
                    y_values = df[columns[1]]

                    ax.bar(x_values, y_values, color="skyblue")
                    ax.set_xlabel(columns[0])
                    ax.set_ylabel(columns[1])
                    ax.set_xticks([])  
                    ax.set_title(f"Bar Chart of {columns[1]} by {columns[0]}")
            elif plot_type == "pie" and len(columns) == 1:
                column = columns[0]

                   
                df_clean = df[column].dropna()

                if df_clean.empty:
                 ax.text(0.5, 0.5, "No Data Available", fontsize=12, ha="center", va="center")
                else:
                 value_counts = df_clean.value_counts()

                 
                ax.pie(value_counts, labels=value_counts.index, autopct="%1.1f%%",
                colors=plt.cm.Paired.colors, startangle=140)
                ax.set_title(f"Distribution of {column}")

        
            else:
                ax.text(0.5, 0.5, "Invalid Plot Type", fontsize=12, ha="center")
                print("Unsupported Plot Type")

            ax.set_title(f"{plot_type.capitalize()} for {', '.join(columns)}")

           
            img_io = io.BytesIO()
            plt.savefig(img_io, format="png")
            plt.close(fig)
            img_io.seek(0)

          
            base64_image = base64.b64encode(img_io.getvalue()).decode("utf-8")

            return f"{base64_image}"  

        except Exception as e:
            print("Plot Generation Error:", str(e))
            return None 

    return None 


@app.post('/')
async def prompt(file: Optional[UploadFile] = File(None),  prompt: Optional[str] = Form(None) ):
     
 
    print("File...", file)
    if(file):
     if(prompt):
        response = genai.GenerativeModel("gemini-2.0-flash").generate_content(
        "for EDA tell me the plot type and columns name mentioned in this only plot type and columns name make it like object or dictionary : " + (prompt or "")
        )
     print("file name :: ",file.filename)
     df = pd.read_csv(file.file)
     df1 = df.head().to_html(classes="styled-table", index=False)
     df2 = df.tail().to_html(classes="styled-table" , index=False)

     buffer = io.StringIO()
     df.info(buf=buffer)
     info_str = buffer.getvalue().replace('\n' , '<br>')



     unique_cols = df.nunique().reset_index()
     unique_cols.columns = ["Columns" , "Unique_Values"]
     unique_html = unique_cols.to_html(classes='styled-table' , index=False)


     dfDescribe = df.describe().to_html(classes='styled-table')



     dfNull  = df.isnull().sum().reset_index()
     dfNull.columns = ["Columns" , "Null Values"]
     dfNUllhtml = dfNull.to_html(classes='styled-table')
     response_data = []
     if(prompt):
      response_data = [
      {"type": "Head", "data": df1},
      {"type": "Shape", "data": str(df.shape)},
      {"type": "Data info", "data": info_str},
      {"type": "Data unique_val", "data": str(unique_html)},
      {"type": "Describe", "data": str(dfDescribe)},
      {"type": "Data Null_values", "data": str(dfNUllhtml)},
      {"type" : "image" , "data" : generate_plot(df , prompt)}
     ]
     else:
        response_data = [
      {"type": "Head", "data": df1},
      {"type": "Shape", "data": str(df.shape)},
      {"type": "Data info", "data": info_str},
      {"type": "Data unique_val", "data": str(unique_html)},
      {"type": "Describe", "data": str(dfDescribe)},
      {"type": "Data Null_values", "data": str(dfNUllhtml)},
      {"type" : "image" , "data" : generate_plot(df , None)}
     ]
 
     return JSONResponse(content = response_data) 
    else : return JSONResponse(content = None)


































