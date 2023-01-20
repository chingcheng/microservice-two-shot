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
        "import_href",
    ]

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name",
        "id",
    ]

    def get_extra_data(self, o):
        return {"location": o.location.closet_name}

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
        "location": LocationVOEncoder()
    }

@require_http_methods(["GET", "POST"])
def list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hat.object.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse (
            {"hats": hats},
            encoder=HatListEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)

        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET"])
def show_hat(request, id):
    if request.method == "GET":
        hat = Hat.objects.get(id=id)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=id).delete()
        return JsonResponse({"delete": count > 0})
    # elif request.method == "PUT":
    #     content = json.loads(request.body)
    #     try:
    #         if "location" in content:
    #             location = LocationVO.objects.get(id=content["location"])
    #             content["location"] = location
    #     except LocationVO.DoesNotExist:
    #         return JsonResponse(
    #             {"message": "Invalid location"},
    #             status=400,
    #         )
    # Hat.objects.filter(id=id).update(**content)

    # hat = Hat.objects.get(id=id)
    # return JsonResponse(
    #     hat,
    #     encoder=HatDetailEncoder,
    #     safe=False,
    # )
