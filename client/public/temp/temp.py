LLM = "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo"

input_json = {"subject": "AI Devs"}

import json
import requests

def generate(LLM: str, messages: list[dict[str, str]], params: dict=None) -> str:
    """
    Generate text outputs using the agent pipeline
    """
    body = {
        "model": LLM,
        "messages": messages
    }
    response = requests.post(
        url="https://dev.beyondnetwork.xyz/api/chat/completions",
        headers={
            "x-api-key": "4f6h8j0l-4321-1234-m5n7-p9r1t3v5x7z9",
            "Content-Type": "application/json",
        },
        data=json.dumps(body),
    )
    if response.status_code != 200:
        return json.dumps({
            "error": "Beyond API error",
            "reason": response.reason
        })
    response = response.json()
    return json.dumps(response["choices"][0]["message"]["content"])
    
def run(input_json, context=None):
    messages = []
    messages.append({"role": "system", "content": "You are a joke teller. Tell a joke about the subject provided."})
    if context:
        messages.append({"role": "user", "content": "This is the context: " + context + "\nNow, tell a joke about the following subject: " + input_json["subject"]})
    else:
        messages.append({"role": "user", "content": "Tell a joke about the following subject: " + input_json["subject"]})
    
    response = generate(LLM, messages, {"temperature": 0.7, "max_tokens": 100})

    example_output = {
        "joke": response
    }
    return example_output



print(json.dumps(run(input_json)))