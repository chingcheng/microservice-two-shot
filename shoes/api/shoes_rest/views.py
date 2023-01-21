from django.shortcuts import render
from common.json import ModelEncoder
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from .models import Shoe, BinVO


class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name",
        "bin_number",
        "bin_size",
        "import_href",
        "id",
    ]


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        # "name",
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "id",
        "bin",
    ]
    encoders = {
        "bin": BinVOEncoder(),
    }

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        # "name",
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "bin",
    ]
    encoders = {
        "bin": BinVOEncoder(),
    }


@require_http_methods({"GET", "POST"})
def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Bin"},
                status=400,
            )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeListEncoder,
            safe=False,
        )

@require_http_methods(["GET", "PUT"])
def api_show_shoes(request, pk):
    if request.method == "GET":
        try:
            shoe = Shoe.objects.get(pk=id)
            return JsonResponse(
                {"shoe": shoe},
                encoder=ShoeDetailEncoder,
                safe=False,
            )
        except Shoe.DoesNotExist:
            return JsonResponse(
                {"message": "Bin does not exist"},
                status=400,
            )
    else:
        content = json.loads(request.body)
        Shoe.objects.filter(pk=id).update(**content)
        shoe = Shoe.objects.get(pk=id)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
