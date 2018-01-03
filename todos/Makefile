ZIP='package.zip'

deploy:
	zip -r $(ZIP) ./*
	aws lambda update-function-code --function-name crud_todo --zip-file fileb://$(ZIP)
