from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Hat, LocationVO

import json
from common.json import ModelEncoder

class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "closet_name",
        "section_number",
        "shelf_number",

    ]

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "id",
        "style_name",
    ]


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name",
        "fabric",
        "color",
        "picture",
        "location",
    ]
    encoders = {
        "location": LocationVOEncoder
    }

@require_http_methods(["GET", "POST"])
def list_hats(request):
    if request.method == "GET":
        hats = Hat.objects.all()

        return JsonResponse (
            {"hats": hats},
            encoder=HatListEncoder,
        )

    else:
        content = json.load(request.body)
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
