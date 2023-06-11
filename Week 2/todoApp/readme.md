

Actions we want to take
add an entry (POST)
delete an entry(DELETE)
list all entries - summary info only (GET)
get an entry - with all details (GET)
update and entry (PUT)


What do entries have:

-title
-completed/done flag
-id 
-notes


//when creating a task, you would want to use this route and this body
POST/ todos
{
    "title" : "Feed the cat",
    "notes" : "Give the cat 1 scoop of tuna mixed with 1 scoop of dry food"
}

return: nothing

//how to get all the entries
GET /todos
return: an array of todo entries, summary only

//how to get the summary of a specific task
GET /todos/:id

return: a single todo complete todo entry, inclusing information

//delete entries
DELETE /todos/:id
return: nothing

//update an entry

PUT /todos/:id
{
    "title" : "Feed the cat",
    "notes": "give the cat one scoop of tuna, mixed with water",
    "done" : true
}