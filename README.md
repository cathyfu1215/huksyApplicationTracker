## Project Name: Husky Job Application Tracker


### Video demo of the Minimal Viable Product

### Features


### Data Model

Collections and subcollections:

* users (contains document 'user')
* jobApplicationRecords (contains document 'jobApplicationRecord')
* notes (contains document 'note')
* todos (contains document 'todo')

Documents:

* user
* jobApplicationRecord
* note
* todo

The organization of the collections and documents:

* The top level of our collection is the users collection.
* Each user in users collection will have a document, which contains several properties, including the subcollection of jobApplicationRecords.
* Each jobApplicationRecord document will contain several properties, including the subcollection of notes and todos.
* Please see details of the documents below.

##### (Document)User
email (String)
name (String)
profilePhoto (blob)
numJobsSaved (int)
numJobsApplied (int)
numInterview (int)
numAcceptance (int)
numRejection (int)
achievementLogs (list of Strings)
badgesEarned (list of blobs)
jobApplicationRecords (collection)

##### (Document)JobApplicationRecord
company (String)
postion (String)
location (String/location object)
preferenceScore (int, [1,10])
URL (String,optional)
status (Enum):
    In Progress
    Applied
    Interviewing
    Interviewed
    Offer
    Offer Accepted
    Rejected
notes (Collection,optional)
todos (Collection,optional)
lastUpdated (datetime)

##### (Document) Note
photo (blob)
text (String)
##### (Document) Todo
text (String)
completed (boolean)

### Credits

This project originates from a [Mobile Development class project](https://github.com/cathyfu1215/huskyJobHuntTracker), which is designed by me, and implemented by me and my teammate Serena. We received help and advices from my professor Neda, teaching assistant Min and lots of classmates.

I am willing to improve this product after the class ends, so I started this new repo.
I will fix the existing bugs, improve the UX design and add more features to this product.
I hope it will help more students in the job hunt season!