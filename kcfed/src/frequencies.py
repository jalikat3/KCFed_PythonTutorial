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

main()