import ollama

def generate_answer(question, context):

    prompt = f"""
    You are a legal AI assistant.

    Answer the question using ONLY the provided context.

    Context:
    {context}

    Question:
    {question}
    """

    response = ollama.chat(
        model='llama3',
        messages=[
            {
                'role': 'user',
                'content': prompt
            }
        ]
    )

    return response['message']['content']