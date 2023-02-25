import json

# code here
# File designed to count the number of occurences of a given string in a given file.
# The results are sent to the interpreter in various forms including a dictionary.



from time import sleep




"""
    Inverts the keys and values of a dictionary and returns the new one
"""
def invert(dictionary):
    newdict = {}
    for key, value in dictionary.items():
        if value in newdict.keys():
            newdict[value] = newdict[value] + ", " + key
        else:
            newdict[value] = key
    return newdict



"""
    Creates a dictionary using the elements of the given list. The function adds the 
    number of repeated elements and makes the number that elements value
"""
def freqDict(subSequence):
    word2freq = {}
    for i in subSequence:
        word2freq[i] = word2freq.get(i,0) + 1 # zero is the 'default' value
    print(word2freq)






"""
    Counts the number of times the given substring -- called 'sub' -- apears in the
    given file.
    
    Sends the substring to freqDict to create a dictionary
"""
def subCounter(sub, file):
    infile=open(file, "r")
    data = infile.read() # reads the data from the file
    datalst = data.split() # splits data into a list
    newData = ''.join(datalst) # joins the data back into a string to eliminating spaces
    subLen = len(sub)
    dataLen = len(newData)
    counter = 0
    sequences = []
    # Creates and adjusts a window the size of the substring alongside the data.
    for idx in range(dataLen - subLen + 1):
        # slides the window alogside the data and compares contents of the window to the substring
        if newData[idx:idx+subLen] == sub:  # window matches substring
            counter += 1
            sequences.append(newData[idx:idx+subLen])
    freqDict(sequences) # calls freqDict to create frequency dictionary based on the list of the substring
    infile.close()
    return counter #returns the number of times the substring appeared in the file



"""
    Reads a file and counts the number of times a word in the 'commonWords' list appears 
    in the file. 

    The words are then placed in a dictionary alongside their number of occurences

"""

def commonWords(newWord,file):
    infile=open(file, 'r')
    data = infile.read()
    infile.close()

    commonWords = ['the', 'a', 'of', 'be', 'and', 'in', 'to', 'too', 'have', 'it', 'for', 'but', 'from', 'with', 'would', 'mine']
    if newWord not in commonWords:
        commonWords.append(newWord)

    frequencyDict = {}
    print("word:   frequency")
    for word in  commonWords:
        frequencyDict[word] = data.count(word)
        print(f"   ", word, "   ",data.count(word), data.count(word.capitalize()))
    print(frequencyDict)



def main():
    # grabbing file and new word from user
    subString1 = input("Enter the word you're looking for: ")
    file = input("Enter the file you want to read: (tip: enter 'files'\ before entering the file name)\n")


    #running commonWords()
    commonWords(subString1, file)

    sleep(2)
    print()

    # running subCounter
    occurences=subCounter(subString1, file)
    print(f"# of occurrences of '{subString1}': ", occurences)

# create a dictionary to store the JSON data
steps = []

# create a dictionary for each step and add it to the list
step1 = {
    "step": 1,
    "title": "Step 1",
    "instruction": "Enter the following code and click 'Run Code'",
    "expectedCode": "print('Hello, world!')",
    "success_message": "Great job! You printed your first message."
}
steps.append(step1)

step2 = {
    "step": 2,
    "title": "Step 2",
    "instruction": "Add a new line of code that prints the result of adding 2 and 2",
    "expectedCode": "print(2+2)",
    "success_message": "Awesome! You just printed the result of adding 2 and 2."
}
steps.append(step2)

step3 = {
    "step": 3,
    "title": "Step 3",
    "instruction": "Create a variable 'name' and assign it to Chris",
    "expectedCode": "name='Chris'",
    "success_message": "Well done! You created a variable."
}
steps.append(step3)

# create a dictionary for step 4 with the expected code
step4 = {
    "step": 4,
    "title": "Step 4",
    "instruction": "Run the 'main' function to count the number of occurrences of a given string in a given file.",
    "expectedCode": json.dumps({
        "function": "main",
        "code": main
    }),
    "success_message": "Great job! You counted the number of occurrences of a given string in a given file."
}
steps.append(step4)

# write the JSON data to a file
with open("steps.json", "w") as f:
    json.dump(steps, f, indent=2)
